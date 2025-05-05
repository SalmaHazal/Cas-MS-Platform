import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';

export const authHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;
  if (token) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
    return next(authReq);
  }
  return next(req);
};
