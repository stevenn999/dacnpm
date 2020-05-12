const axios = require("axios");

authFacebook = (req, res, next) => {
  const tokenAccess = req.body.token;
  axios
    .get(
      `https://graph.facebook.com/me?access_token=${tokenAccess}`
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

module.exports = authFacebook;
