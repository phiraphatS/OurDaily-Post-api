import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, timeout } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        this.logger.log(`Request url: ${context.switchToHttp().getRequest().url}`);

        return next
            .handle()
            .pipe(
                tap(() => {
                    const response = context.switchToHttp().getResponse();
                    const statusCode = response.statusCode;
                    
                    switch (true) {
                        case (statusCode >= 100 && statusCode <= 199):
                            this.logger.log(`Informational response: ${statusCode}`);
                            break;
                        case (statusCode >= 200 && statusCode <= 299):
                            this.logger.log(`Successful response: ${statusCode}`);
                            break;
                        case (statusCode >= 300 && statusCode <= 399):
                            this.logger.warn(`Redirection response: ${statusCode}`);
                            break;
                        case (statusCode >= 400 && statusCode <= 499):
                            this.logger.error(`Client error response: ${statusCode}`);
                            break;
                        case (statusCode >= 500 && statusCode <= 599):
                            this.logger.error(`Server error response: ${statusCode}`);
                            break;
                        default: break;
                    };
                }),
                timeout(5000),
                catchError((error) => {
                    this.logger.error(`Error: ${error.message}`);
                    return throwError(() => error);
                }),
            );
    }
}