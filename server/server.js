const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

app.use(express.json());
////// this is our socket.io boilerplate  //////
const server = require("http").Server(app);
let localOrHeroku;
if (process.env.NODE_ENV === "production") {
    localOrHeroku = "https://frienz-network.herokuapp.com";
} else {
    localOrHeroku = "http://localhost:3000";
}
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith(localOrHeroku)),
});
//////////////////////////////////////////////

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
}

if (process.env.NODE_ENV == "production") {
    sessionSecret = process.env.SESSION_SECRET;
} else {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
}
const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("./secrets.json").COOKIE_SECRET;

const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: true,
});
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});









server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
let onlineUsers = [];

io.on("connection", async (socket) => {
    if (!socket.request.session.id) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.id;
    // console.log(
    //     `Socket with id: ${socket.id} has connected on UserId: ${userId}`
    // );

    const onlineUser = { id: userId, socket: socket.id };
    // if (onlineUsers.every((element) => element.id !== userId)) {
    // } not necessary !!!!
    onlineUsers.push(onlineUser);

    console.log("Currently Online Users", onlineUsers);
    const onlineUsersInfo = await db
        .getUsersByIds(onlineUsers.map((e) => e.id))
        .then((result) => result.rows);
    io.emit("online-users", onlineUsersInfo);

    const messageArray = await db.getRecentMessages().then((data) => data.rows);
    socket.emit("messages", messageArray);
    socket.on("new-message", async (text) => {
        const { first_name, profilepic } = await db
            .getUserById(userId)
            .then((result) => result.rows[0]);

        const message = await db
            .addNewMessages(userId, first_name, profilepic, text)
            .then((result) => result.rows);
        io.emit("messages", message);
    });

    socket.on("get-all-direct-messages", async (paramsId) => {
        const messages = await db
            .findDirectMessages(paramsId, userId)
            .then((result) => result.rows);

        socket.emit("direct-messages", messages);
    });

    socket.on("new-direct-message", async (message) => {
        const { first_name, profilepic } = await db
            .getUserById(userId)
            .then((result) => result.rows[0]);

        let directMessage = await db
            .addDirectMessage(
                userId,
                message.receiverId,
                message.text,
                profilepic,
                first_name
            )
            .then((result) => result.rows[0]);

        if (onlineUsers.find((e) => e.id === Number(message.receiverId))) {
            const receiverSocketId = await onlineUsers.find(
                (e) => e.id === Number(message.receiverId)
            ).socket;
            socket.join(receiverSocketId);
            io.to(receiverSocketId).emit("direct-messages", directMessage);
            io.to(receiverSocketId).emit("direct-message-notification", {
                ...directMessage,
                dm: true,
            });
        } else {
            socket.emit("direct-messages", directMessage);
        }

        // io.to(receiverSocketId).emit(directMessage);
    });

    socket.on("Add to Friend", async (friendUserId) => {
        onlineUsers.forEach(async (e) => {
            if (e.id === +friendUserId) {
                // eslint-disable-next-line no-unused-vars
                const { email, password_hash, bio, ...userData } = await db
                    .getUserById(userId)
                    .then((data) => data.rows[0]);
                io.to(e.socket).emit("Accept Friend", userData);
            }
        });
    });

    // this will run every time a socket disconnect
    socket.on("disconnect", async () => {
        console.log(
            `Socket with id: ${socket.id} and userId:${userId} just disconnected!`
        );
        onlineUsers = await onlineUsers.filter(
            (element) => element.id != userId
        );
        const onlineUsersInfo = await db
            .getUsersByIds(onlineUsers.map((e) => e.id))
            .then((result) => result.rows);
        io.emit("online-users", onlineUsersInfo);
    });
});
