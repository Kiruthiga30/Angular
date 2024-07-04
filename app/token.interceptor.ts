import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpHandlerFn,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Add authorization header with JWT token 
    const currentUser = this.authService.currentUserValue;
    request = request.clone({ headers: request.headers.set('x-auth-token', `${currentUser.token}`) });
    console.log(currentUser.token);
    return next.handle(request);
  }
}

