"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const user_entity_1 = require("../users/user.entity");
const user_level_enum_1 = require("../users/user-level.enum");
class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
        });
        this.authService = authService;
    }
    async validate(payload) {
        const { email } = payload;
        if (!email)
            throw new Error('Email cannot be null.');
        const user = await user_entity_1.User.findOne({ where: { email } });
        if (!user.status && user.level == user_level_enum_1.UserLevel.UMKM) {
            throw new common_1.UnauthorizedException('User Is Not Active!');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('User Not Found!');
        }
        return user;
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map