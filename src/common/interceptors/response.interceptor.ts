// src/common/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Nếu controller đã trả về object { data, message } thì dùng luôn
        if (
          data &&
          typeof data === 'object' &&
          'data' in data &&
          'message' in data
        ) {
          return {
            success: true,
            message: data.message,
            data: data.data,
          };
        }

        return {
          success: true,
          message: 'OK', // default message
          data: data,
        };
      }),
    );
  }
}
