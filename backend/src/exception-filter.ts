import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from "@nestjs/common";
import { Request, Response } from 'express';
import { MongoServerError, MongoError } from 'mongodb';

@Catch(MongoError)
export class AllExceptionsFilter implements ExceptionFilter {

  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getNext();
    const request = ctx.getRequest<Request>();
    let status = 500;
    let msg = exception.message;

    if (exception instanceof MongoServerError) {
      this.logger.warn('MongoServerError', exception);
      if (exception.code === 11000) {
        status = 401;
      }
    }

    return 

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        msg,
      });
  }
}