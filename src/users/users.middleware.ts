import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['X-API-KEY'] !== 'admin2023') {
      throw new UnauthorizedException('This token must be filled')
    }
    next()
  }
}
