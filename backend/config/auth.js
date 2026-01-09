import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default function authConfig(){
    const jwtoption = { 
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }

    passport.use(new Strategy(jwtoption, (payload, next) => {
        return next(null, payload);
    }));
}

export const verificarAutenticacion = passport.authenticate('jwt', { session: false });