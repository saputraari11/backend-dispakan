import { Injectable, NestMiddleware, Logger } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url } = request
    const userAgent = request.get('user-agent') || ''

    if (
      url == '/health' &&
      method == 'GET' &&
      userAgent.startsWith('kube-probe/')
    ) {
      this.logger.log(`${method} ${url} --- --- - ${userAgent} ${ip}`)
      return next()
    }

    response.on('finish', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')

      // this.logger.debug(
      //   ` ${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      // );
      this.logger.debug(
        ` ${method} ${url} ${JSON.stringify(request.body)} ${statusCode}`,
      )
    })

    next()
  }
}
