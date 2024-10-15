import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body, headers } = request;
    const now = Date.now();

    return next.handle().pipe(
      // Log successful response
      tap((data) => {
        const statusCode = response.statusCode;
        const responseTime = Date.now() - now;

        this.logger.log(
          JSON.stringify({
            method,
            url,
            statusCode,
            responseTime: `${responseTime}ms`,
            requestBody: body,
            responseData: data,
          }),
        );
      }),
      // Handle and log errors
      catchError((error) => {
        const statusCode = response.statusCode || 500; // Default to 500 if status not available
        const responseTime = Date.now() - now;

        // Log error details and stack trace
        this.logger.error(
          JSON.stringify({
            method,
            url,
            statusCode,
            responseTime: `${responseTime}ms`,
            requestBody: body,
            errorMessage: error.message,
            stackTrace: error.stack,
          }),
        );

        // Send error details to an external logging service
        this.sendErrorToLoggingService(error, { method, url, body, headers });

        // Re-throw the error for the response to handle
        return throwError(() => error);
      }),
    );
  }

  // Placeholder function for sending errors to an external service
  private sendErrorToLoggingService(
    error: any,
    details: { method: string; url: string; body: any; headers: any },
  ) {
    // Logic to send errors to an external logging service like Sentry, Loggly, etc.
    // Example:
    // loggingService.logError({
    //   errorMessage: error.message,
    //   stackTrace: error.stack,
    //   method: details.method,
    //   url: details.url,
    //   requestBody: details.body,
    //   requestHeaders: details.headers,
    // });
  }
}
