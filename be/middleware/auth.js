const jwt = require("jsonwebtoken");

auth = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "secretKey", (err, payload) => {
      if (err)  res.status(401).send("Không được phép truy cập")
      req.tokenPayload = payload;
      next();
    });
  } else {
    res.status(401).send("Không được phép truy cập")
  }
};

module.exports = auth;
