const axios = require("axios");

authGoogle = (req, res, next) => {
  const tokenAccess = req.body.token;
  axios
    .get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenAccess}`
    )
    .then(async (res) => {
      if (res.data) {
        next();
      }
    })
    .catch((e) => {
      res.json({ token: false });
    });
};

module.exports = authGoogle;
