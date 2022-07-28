const jwt = require("jsonwebtoken");
const models = require("./models");

function authenticate(req, res, next) {
  const headers = req.headers["authorization"];
  if (headers) {
    const token = headers.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        res.json({ success: false, message: "Unable to authenticate!" });
      } else {
        const username = decoded.username;
        models.User.findOne({
          where: {
            username: username,
          },
        }).then((user) => {
          if (user) {
            // user is authenticated
            // continue with the original request
            next();
          } else {
            res.json({ success: false, message: "Unable to authenticate!" });
          }
        });
      }
    });
  } else {
    res.json({ success: false, message: "Unable to authenticate!" });
  }
}

module.exports = authenticate;
