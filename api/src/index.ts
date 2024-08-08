const bodyParser = require("body-parser");
const cors = require("cors");
const { passport } = require("./functions/authFunctions");
const { gatewayMiddleware, app } = require("express-service-gateway");
const app_listen_callback = (port: number) => {
  console.log(`API Gateway is running on Port ${port}`);
};
const configJson = {
  api_configurations: [
    {
      target_service_url: "http://service1:3002/",
      changeOrigin: true,
      api_name: "api",
      api_middleware: passport.authenticate("jwt", { session: false }),
    },
  ],
  sever_configurations: {
    sever_port: process.env.PORT || 3001,
    app_listen_callback: app_listen_callback,
  },
};

gatewayMiddleware(configJson);
app.use(cors());
app.use("/auth", require("./routes/auth"));

module.exports = app;
