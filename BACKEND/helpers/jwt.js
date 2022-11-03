// require("dotenv/config");
var jwt = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_TOKEN;
  const api = process.env.BASE_ROUTE;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      // The regex expression captures all routes after products
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
      "/create-payment-intent",
    ],
  });
}

// Different access can be configure here
async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
