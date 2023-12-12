const authRouter = require("./auth");
const homeRouter = require("./home");
const roomRouter = require("./room");
const deviceRouter = require("./device");

function route(app) {
    // roomRouter.param("hid", (req, res, next, hid) => {
    //     // Lưu tham số vào đối tượng yêu cầu
    //     req.hid = hid;
    //     // Tiếp tục đến middleware tiếp theo
    //     next();
    //   });

    // Create routes for auth
    app.use("/api/auth", authRouter);
    // Create routes for house user
    app.use("/api/home", homeRouter);

    app.use("/api/home/:hid/room", roomRouter);

    app.use("/api/device", deviceRouter);
}

module.exports = route;
