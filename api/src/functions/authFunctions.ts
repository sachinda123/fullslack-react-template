const passport = require("passport");
const passportJWT = require("passport-jwt");
const {
  models: { User, Role },
} = require("./models");
const { Strategy, ExtractJwt } = passportJWT;
interface Ipassport {
  time: number;
  id: number;
}

interface IjwtOptions {
  jwtFromRequest: any;
  secretOrKey: string;
}

const jwtOptions: IjwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "my_key",
};

passport.use(
  new Strategy(jwtOptions, async (payload: Ipassport, done: any) => {
    console.log("payload", payload);
    const user = await User.findOne({
      where: { id: payload.id },
      rows: true,
    });

    if (user) {
      return done(null, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      return done(null, false);
    }
  })
);
module.exports = { passport };
