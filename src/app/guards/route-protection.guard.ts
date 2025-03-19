import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { userTokenStoreName } from '../utils/sotre';
import { SignService } from '../services/auth/sign.service';
import { Response } from '../models/response.model';
import { User } from '../models/auth/user.model';
import { apiUrl } from '../utils/url';

type AuthenticationResponse = {
  key: string;
};

@Injectable({
  providedIn: 'root',
})
export class RouteProtectionGuard implements CanActivate, CanActivateChild {
  router = inject(Router);
  httpClient = inject(HttpClient);
  signService = inject(SignService);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const routeType = next.routeConfig?.path || '';
    return this.handleRouteProtection(routeType);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const routeType = childRoute.parent?.routeConfig?.path || '';
    return this.handleRouteProtection(routeType);
  }

  private getToken() {
    return localStorage.getItem(userTokenStoreName);
  }

  private handleRouteProtection(routeType: string): Observable<boolean> {
    return of(undefined).pipe(
      switchMap(() => {
        return this.checkAuthentication().pipe(
          map((auth) => {
            if (auth.key === 'not authenticated') {
              this.signService.signOut();
              return false;
            }

            if (
              (routeType === 'client' && auth.key !== 'client') ||
              (routeType === 'manager' && auth.key !== 'manager')
            ) {
              this.signService.signOut();
              return false;
            }

            return true;
          }),
          catchError(() => {
            this.signService.signOut();
            return of(false);
          })
        );
      })
    );
  }

  private checkAuthentication(): Observable<AuthenticationResponse> {
    const token = this.getToken();
    if (token === null) {
      return of({ key: 'not authenticated' });
    }

    return this.httpClient
      .post<Response<User>>(`${apiUrl}/auth/token`, { token })
      .pipe(
        map((response) => ({
          key: response.data.role?.label || 'not authenticated',
        }))
      );
  }
}
