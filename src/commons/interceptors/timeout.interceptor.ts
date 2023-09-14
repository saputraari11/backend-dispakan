import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { Inject } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(150000),
      catchError((err) => {
        // console.log(context.switchToHttp().getResponse().req);
        const { body, url, method } = context.switchToHttp().getResponse().req;

        if (err instanceof TimeoutError) {
          this.logger.error(`${method} ${url} - ${err}`, { data: body });
          return throwError(() => new RequestTimeoutException());
        }
        if (err instanceof InternalServerErrorException) {
          this.logger.error(`${method} ${url} - ${err}`, { data: body });
        }
        return throwError(() => err);
      }),
    );
  }
}
