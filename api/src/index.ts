// const express = require("express");
// const bodyParser = require("body-parser");
// const passport = require("passport");
// const passportJWT = require("passport-jwt");
// const cors = require("cors");
// const {
//   models: { User, Role },
// } = require("./models");
// const { Strategy, ExtractJwt } = passportJWT;

const { gatewayMiddleware, app } = require("express-service-gateway");

const apiMiddleware = (req, res, next) => {
  console.log("Request is being processed by middleware.");
  next();
};

const app_listen_callback = (port: number) => {
  console.log(`API Gateway is running on Port ${port}`);
};

const configJson = {
  api_configurations: [
    {
      target_service_url: "http://service1:3002/",
      changeOrigin: true,
      api_name: "api",
      api_middleware: apiMiddleware,
    },
  ],
  sever_configurations: {
    sever_port: process.env.PORT || 3001,
    app_listen_callback: app_listen_callback,
  },
};

gatewayMiddleware(configJson);

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: "my_key",
// };

// interface passport {
//   time: number;
//   id: number;
// }

// passport.use(
//   new Strategy(jwtOptions, async (payload: passport, done: any) => {
//     // const currentTime = Date.now();
//     //set 120 minute expair token time
//     // if (payload.time + 1000 * 60 * 120 < currentTime) {
//     //   return done(null, false);
//     // } else {
//     const user = await User.findOne({
//       where: { id: payload.id },
//       rows: true,
//     });

//     if (user) {
//       return done(null, {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       });
//     } else {
//       return done(null, false);
//     }
//     // }
//   })
// );

app.get("/", (req, res) => {
  res.send("gateway");
});
// // app.use("/list", passport.authenticate("jwt", { session: false }), require("./routes/list"));
// app.use("/auth", require("./routes/auth"));

// const port = process.env.PORT || 3001;
// app.listen(port, async () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
