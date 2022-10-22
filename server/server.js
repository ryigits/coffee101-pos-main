const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const endofthedayRoute = require("./routes/endoftheday");
const productsRoute = require("./routes/products");
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");

app.use(express.json());
app.use(compression());
app.use(morgan("common"));
////// this is our socket.io boilerplate  //////
const server = require("http").Server(app);
const io = require("socket.io")(server);
//////////////////////////////////////////////

let sessionSecret = process.env.SESSION_SECRET;
let MONGO_URL = process.env.MONGO_URL;

if (!sessionSecret) {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
    MONGO_URL = require("./secrets.json").MONGO_URL;
}

if (process.env.NODE_ENV == "production") {
    sessionSecret = process.env.SESSION_SECRET;
    MONGO_URL = process.env.MONGO_URL;
} else {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
    MONGO_URL = require("./secrets.json").MONGO_URL;
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
dotenv.config();

mongoose.connect(MONGO_URL, () => {
    console.log("Connected to MongoDB");
});
//ROUTES
app.use("/api/products", productsRoute);
app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
app.use("/api/endoftheday", endofthedayRoute);

//BOILERPLATE
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
////

//SOCKET THINGS

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

    onlineUsers.push(onlineUser);

    console.log("Currently Online Users", onlineUsers);
});
