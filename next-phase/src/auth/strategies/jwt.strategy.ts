import { Injectable, UnauthorizedException,  } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { BlacklistService } from '../blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  userService: any;
  constructor(private usersService: UsersService,
    private blacklistService: BlacklistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt_secret',
      //ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!token) {
      throw new UnauthorizedException('Token is missing.');
    }
    if (this.blacklistService.has(token)) {
      throw new UnauthorizedException('Token has been logged out.');
    }
    return { id: payload.sub, email: payload.email };
    // const user = await this.usersService.findByEmail(payload.sub); 
    // if (!user) throw new UnauthorizedException();
    // return user; 
  }
}
