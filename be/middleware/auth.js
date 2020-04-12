const jwt = require("jsonwebtoken");
const createError = require("http-errors");

auth = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(req.headers["x-access-token"])
  if (token) {
    jwt.verify(token, "secretKey", (err, payload) => {
      if (err) throw createError(401, err);
      req.tokenPayload = payload;
      next();
    });
  } else {
    throw createError(401, "No accessToken found.");
  }
};

module.exports = auth;
