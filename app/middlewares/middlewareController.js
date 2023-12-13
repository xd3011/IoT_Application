const jwt = require("jsonwebtoken");
const Home = require("../models/Home");

const middlewareController = {
    verifyToken(req, res, next) {
        const token = req.headers.token || req.cookies.accessToken;
        if (token) {
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },
    verifyTokenAndCheckIsUser(req, res, next) {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.uid == req.params.uid) {
                next();
            }
            else {
                return res.status(404).json("UserId is not you");
            }
        })
    },

    verifyTokenAndOwnerAuthOrIsUser(req, res, next) {
        middlewareController.verifyToken(req, res, () => {
            Home.findById(req.params.hid)
                .then((home) => {
                    if (home.owner == req.user.id || req.body.id == req.user.id) {
                        next();
                    }
                    else {
                        return res.status(403).json("You are not the owner of this house");
                    }
                })
                .catch(err => {
                    return res.status(403).json("HomeId not found");
                })
        })
    },

    verifyTokenAndOwnerAuth(req, res, next) {
        middlewareController.verifyToken(req, res, () => {
            Home.findById(req.params.hid)
                .then((home) => {
                    if (home.owner == req.user.uid) {
                        next();
                    }
                    else {
                        return res.status(403).json("You are not the owner of this house");
                    }
                })
                .catch(err => {
                    return res.status(403).json("HomeId not found");
                })
        });
    },
};

module.exports = middlewareController;
