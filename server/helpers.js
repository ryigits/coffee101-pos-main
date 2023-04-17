const Order = require("./models/Order");
const Endoftheday = require("./models/Endoftheday");
const AllRevenue = require("./models/AllRevenues");
const CoffeeConsume = require("./models/CoffeeConsume");
const nodemailer = require("nodemailer");
const MAIL_SECRET =
    process.env.MAIL_SECRET || require("./secrets.json").MAIL_SECRET;

const coffeeConsume = async () => {
    const lastday = await Endoftheday.find({
        createdAt: { $lt: new Date() },
        location: "yuzyil",
    })
        .sort({
            createdAt: -1,
        })
        .limit(1);
    const currentOrders = await Order.where("createdAt").gt(
        lastday[0].createdAt
    );

    const _soldArray = currentOrders.map((order) => order.items).flat();

    const mergedArray = _soldArray.reduce((obj, item) => {
        obj[item.id]
            ? (obj[item.id].amount += item.amount)
            : (obj[item.id] = { ...item });
        return obj;
    }, {});

    const mostSoldArray = Object.values(mergedArray);

    var curveCoffeeGr = mostSoldArray.filter((item) =>
        item.title.includes("Curve")
    );
    if (curveCoffeeGr.length > 0) {
        curveCoffeeGr = Number(
            curveCoffeeGr
                .map((item) => item.amount * 10)
                .reduce((a, b) => a + b, 0)
        );
    }
    var topCoffeeGr = mostSoldArray.filter((item) =>
        item.title.includes("Top")
    );
    if (topCoffeeGr.length > 0) {
        topCoffeeGr = Number(
            topCoffeeGr
                .map((item) => item.amount * 20)
                .reduce((a, b) => a + b, 0)
        );
    }
    var iceCoffeeGr = mostSoldArray.filter((item) =>
        item.title.includes("Ice")
    );
    if (iceCoffeeGr.length > 0) {
        iceCoffeeGr = Number(
            iceCoffeeGr
                .map((item) => item.amount * 20)
                .reduce((a, b) => a + b, 0)
        );
    }
    var coldBrewCoffeeGr = mostSoldArray.filter((item) =>
        item.title.includes("Brew")
    );
    if (coldBrewCoffeeGr.length > 0) {
        coldBrewCoffeeGr = Number(
            coldBrewCoffeeGr
                .map((item) => item.amount * 30)
                .reduce((a, b) => a + b, 0)
        );
    }
    var totalCoffeeConsumeGr =
        curveCoffeeGr + topCoffeeGr + iceCoffeeGr + coldBrewCoffeeGr;

    return +totalCoffeeConsumeGr;
};

const calculateCiro = (lastday, currentday) => {
    if (!lastday) {
        return (
            +currentday.kasadancikis +
            +currentday.kasafix +
            +currentday.finansbank +
            +currentday.ziraatbank +
            +currentday.harcama
        );
    }
    return (
        +currentday.kasadancikis +
        +currentday.kasafix +
        +currentday.finansbank +
        +currentday.ziraatbank +
        +currentday.harcama -
        lastday.kasafix
    );
};

const currentRevenue = async (location) => {
    const lastday = await Endoftheday.find({
        createdAt: { $lt: new Date() },
        location: "yuzyil",
    })
        .sort({
            createdAt: -1,
        })
        .limit(1);

    const currentOrders = await Order.find({
        createdAt: { $gt: lastday[0].createdAt },
        location: location,
    }).sort({
        createdAt: -1,
    });
    const calculateRevenue = (currentOrders) => {
        return currentOrders.reduce((prev, current) => prev + current.total, 0);
    };

    const result = calculateRevenue(currentOrders);

    return result;
};

const sendInfoMailDailyRevenue = (
    currentday,
    endoftheday,
    location,
    calculatedRevenue,
    todayCoffeeConsume
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "metucoffee101",
            pass: MAIL_SECRET,
        },
    });
    let mailData = {};
    if (location === "yuzyil") {
        mailData = {
            from: "metucoffee101@gmail.com",
            to: `ryigit@gmail.com, boranaycicekflcn@gmail.com , candasmisir@gmail.com `,
            subject: `${new Date(currentday.time)
                .toString()
                .slice(0, 10)} ${location} revenue`,
            html: `<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Ciro</title>
        <style>
            /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */

            /*All the styling goes here*/

            img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%;
            }

            body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }

            table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%;
            }
            table td {
                font-family: sans-serif;
                font-size: 14px;
                vertical-align: top;
            }

            /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

            .body {
                background-color: #f6f6f6;
                width: 100%;
            }

            /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
            .container {
                display: block;
                margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px;
            }

            /* This should also be a block element, so that it will fill 100% of the .container */
            .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px;
            }

            /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
            .main {
                background: #ffffff;
                border-radius: 3px;
                width: 100%;
            }

            .wrapper {
                box-sizing: border-box;
                padding: 20px;
            }

            .content-block {
                padding-bottom: 10px;
                padding-top: 10px;
            }

            .footer {
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%;
            }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
                color: #999999;
                font-size: 12px;
                text-align: center;
            }

            /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
            h1,
            h2,
            h3,
            h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 30px;
            }

            h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize;
            }

            p,
            ul,
            ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px;
            }
            p li,
            ul li,
            ol li {
                list-style-position: inside;
                margin-left: 5px;
            }

            a {
                color: #db4f1d;
                text-decoration: underline;
            }

            /* -------------------------------------
          BUTTONS
      ------------------------------------- */
            .btn {
                box-sizing: border-box;
                width: 100%;
            }
            .btn > tbody > tr > td {
                padding-bottom: 15px;
            }
            .btn table {
                width: auto;
            }
            .btn table td {
                background-color: #ffffff;
                border-radius: 5px;
                text-align: center;
            }
            .btn a {
                background-color: #ffffff;
                border: solid 1px #db4f1d;
                border-radius: 5px;
                box-sizing: border-box;
                color: #db4f1d;
                cursor: pointer;
                display: inline-block;
                font-size: 14px;
                font-weight: bold;
                margin: 0;
                padding: 12px 25px;
                text-decoration: none;
                text-transform: capitalize;
            }

            .btn-primary table td {
                font-weight: bold;
                color: #ffff;
                background-color: #db4f1d;
            }

            #makeitgray {
                color: #b2b2b2;
                background-color: blanchedalmond;
            }
            #makeitred {
                color: #db4f1d;
                text-decoration: underline;
            }

            .btn-primary a {
                background-color: #db4f1d;
                border-color: #db4f1d;
                color: #ffffff;
            }

            /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
            .last {
                margin-bottom: 0;
            }

            .first {
                margin-top: 0;
            }

            .align-center {
                text-align: center;
            }

            .align-right {
                text-align: right;
            }

            .align-left {
                text-align: left;
            }

            .clear {
                clear: both;
            }

            .mt0 {
                margin-top: 0;
            }

            .mb0 {
                margin-bottom: 0;
            }

            .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0;
            }

            .powered-by a {
                text-decoration: none;
            }

            hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                margin: 20px 0;
            }

            /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
            @media only screen and (max-width: 620px) {
                table.body h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important;
                }
                table.body p,
                table.body ul,
                table.body ol,
                table.body td,
                table.body span,
                table.body a {
                    font-size: 16px !important;
                }
                table.body .wrapper,
                table.body .article {
                    padding: 10px !important;
                }
                table.body .content {
                    padding: 0 !important;
                }
                table.body .container {
                    padding: 0 !important;
                    width: 100% !important;
                }
                table.body .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                }
                table.body .btn table {
                    width: 100% !important;
                }
                table.body .btn a {
                    width: 100% !important;
                }
                table.body .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important;
                }
            }

            /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
            @media all {
                .ExternalClass {
                    width: 100%;
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                }
                .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                }
                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                }
            }
        </style>
    </head>
    <body>
        <span class="preheader">${location} cirosu:${endoftheday.ciro} TL</span>
        <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="body"
        >
            <tr>
                <td>&nbsp;</td>
                <td class="container">
                    <div class="content">
                        <!-- START CENTERED WHITE CONTAINER -->
                        <table role="presentation" class="main">
                            <!-- START MAIN CONTENT AREA -->
                            <tr>
                                <td class="wrapper">
                                    <table
                                        role="presentation"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                    >
                                        <tr>
                                            <td>
                                                <p>Gencler,</p>
                                                <p>${location} cirosu:</p>
                                                <table
                                                    role="presentation"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    class="btn btn-primary"
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td align="left">
                                                                <table
                                                                    role="presentation"
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                Gerçekleşen:
                                                                                ${endoftheday.ciro}
                                                                                TL
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr>
                                                            <td align="left">
                                                                <table
                                                                    role="presentation"
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                id="makeitgray"
                                                                            >
                                                                                Hesaplanan:
                                                                                ${calculatedRevenue}
                                                                                TL
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p>Bugun her iki subede toplam tuketilen kahve miktari <strong id="makeitred">${todayCoffeeConsume}</strong> gramdir.</p>
                                                <p>Hayırlı işler.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- END MAIN CONTENT AREA -->
                        </table>
                        <!-- END CENTERED WHITE CONTAINER -->

                        <!-- START FOOTER -->
                        <div class="footer">
                            <table
                                role="presentation"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                            >
                                <tr>
                                    <td class="content-block">
                                        <span class="apple-link"
                                            >Coffee 101 - OBS Gida Tur Tic Ltd
                                            Sti</span
                                        >
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block powered-by">
                                        Powered by Ygt.
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!-- END FOOTER -->
                    </div>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </body>
</html>
`,
        };
    } else {
        mailData = {
            from: "metucoffee101@gmail.com",
            to: `ryigit@gmail.com, boranaycicekflcn@gmail.com , candasmisir@gmail.com `,
            subject: `${new Date(currentday.time)
                .toString()
                .slice(0, 10)} ${location} revenue`,
            html: `<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Ciro</title>
        <style>
            /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */

            /*All the styling goes here*/

            img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%;
            }

            body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }

            table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%;
            }
            table td {
                font-family: sans-serif;
                font-size: 14px;
                vertical-align: top;
            }

            /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

            .body {
                background-color: #f6f6f6;
                width: 100%;
            }

            /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
            .container {
                display: block;
                margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px;
            }

            /* This should also be a block element, so that it will fill 100% of the .container */
            .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px;
            }

            /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
            .main {
                background: #ffffff;
                border-radius: 3px;
                width: 100%;
            }

            .wrapper {
                box-sizing: border-box;
                padding: 20px;
            }

            .content-block {
                padding-bottom: 10px;
                padding-top: 10px;
            }

            .footer {
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%;
            }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
                color: #999999;
                font-size: 12px;
                text-align: center;
            }

            /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
            h1,
            h2,
            h3,
            h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 30px;
            }

            h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize;
            }

            p,
            ul,
            ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px;
            }
            p li,
            ul li,
            ol li {
                list-style-position: inside;
                margin-left: 5px;
            }

            a {
                color: #db4f1d;
                text-decoration: underline;
            }

            /* -------------------------------------
          BUTTONS
      ------------------------------------- */
            .btn {
                box-sizing: border-box;
                width: 100%;
            }
            .btn > tbody > tr > td {
                padding-bottom: 15px;
            }
            .btn table {
                width: auto;
            }
            .btn table td {
                background-color: #ffffff;
                border-radius: 5px;
                text-align: center;
            }
            .btn a {
                background-color: #ffffff;
                border: solid 1px #db4f1d;
                border-radius: 5px;
                box-sizing: border-box;
                color: #db4f1d;
                cursor: pointer;
                display: inline-block;
                font-size: 14px;
                font-weight: bold;
                margin: 0;
                padding: 12px 25px;
                text-decoration: none;
                text-transform: capitalize;
            }

            .btn-primary table td {
                font-weight: bold;
                color: #ffff;
                background-color: #db4f1d;
            }

            #makeitgray {
                color: #b2b2b2;
                background-color: blanchedalmond;
            }

            .btn-primary a {
                background-color: #db4f1d;
                border-color: #db4f1d;
                color: #ffffff;
            }

            /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
            .last {
                margin-bottom: 0;
            }

            .first {
                margin-top: 0;
            }

            .align-center {
                text-align: center;
            }

            .align-right {
                text-align: right;
            }

            .align-left {
                text-align: left;
            }

            .clear {
                clear: both;
            }

            .mt0 {
                margin-top: 0;
            }

            .mb0 {
                margin-bottom: 0;
            }

            .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0;
            }

            .powered-by a {
                text-decoration: none;
            }

            hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                margin: 20px 0;
            }

            /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
            @media only screen and (max-width: 620px) {
                table.body h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important;
                }
                table.body p,
                table.body ul,
                table.body ol,
                table.body td,
                table.body span,
                table.body a {
                    font-size: 16px !important;
                }
                table.body .wrapper,
                table.body .article {
                    padding: 10px !important;
                }
                table.body .content {
                    padding: 0 !important;
                }
                table.body .container {
                    padding: 0 !important;
                    width: 100% !important;
                }
                table.body .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                }
                table.body .btn table {
                    width: 100% !important;
                }
                table.body .btn a {
                    width: 100% !important;
                }
                table.body .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important;
                }
            }

            /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
            @media all {
                .ExternalClass {
                    width: 100%;
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                }
                .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                }
                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                }
            }
        </style>
    </head>
    <body>
        <span class="preheader">${location} cirosu:${endoftheday.ciro} TL</span>
        <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="body"
        >
            <tr>
                <td>&nbsp;</td>
                <td class="container">
                    <div class="content">
                        <!-- START CENTERED WHITE CONTAINER -->
                        <table role="presentation" class="main">
                            <!-- START MAIN CONTENT AREA -->
                            <tr>
                                <td class="wrapper">
                                    <table
                                        role="presentation"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                    >
                                        <tr>
                                            <td>
                                                <p>Gencler,</p>
                                                <p>${location} cirosu:</p>
                                                <table
                                                    role="presentation"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    class="btn btn-primary"
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td align="left">
                                                                <table
                                                                    role="presentation"
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                Gerçekleşen:
                                                                                ${endoftheday.ciro}
                                                                                TL
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr>
                                                            <td align="left">
                                                                <table
                                                                    role="presentation"
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                id="makeitgray"
                                                                            >
                                                                                Hesaplanan:
                                                                                ${calculatedRevenue}
                                                                                TL
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p>Hayırlı işler.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- END MAIN CONTENT AREA -->
                        </table>
                        <!-- END CENTERED WHITE CONTAINER -->

                        <!-- START FOOTER -->
                        <div class="footer">
                            <table
                                role="presentation"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                            >
                                <tr>
                                    <td class="content-block">
                                        <span class="apple-link"
                                            >Coffee 101 - OBS Gida Tur Tic Ltd
                                            Sti</span
                                        >
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block powered-by">
                                        Powered by Ygt.
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!-- END FOOTER -->
                    </div>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </body>
</html>
`,
        };
    }

    transporter.sendMail(mailData, function (err) {
        if (err) {
            console.log("%cregister.js line:36 err", "color: #007acc;", err);
        } else {
            console.log("mail created and sent");
        }
    });
};

const saveAllRevenues = async (
    currentday,
    endoftheday,
    location,
    calculatedRevenue
) => {
    const newAllRevenues = await new AllRevenue({
        tarih: new Date(currentday.time),
        gerceklesenCiro: endoftheday.ciro,
        hesaplananCiro: calculatedRevenue,
        location: location,
    });
    const result = await newAllRevenues.save();
    result && console.log(result);
};

const saveCoffeeConsume = async (todayCoffeeConsume) => {
    const allCoffeeConsume = await new CoffeeConsume({
        gr: todayCoffeeConsume,
    });
    const result = await allCoffeeConsume.save();
    result && console.log(result);
};

module.exports = {
    calculateCiro,
    currentRevenue,
    sendInfoMailDailyRevenue,
    saveAllRevenues,
    coffeeConsume,
    saveCoffeeConsume,
};
