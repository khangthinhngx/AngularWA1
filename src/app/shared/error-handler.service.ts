import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {

    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = this.handleError(error);
                    return throwError(errorMessage);
                })
            )
    }

    private handleError = (error: HttpErrorResponse): string => {
        if (error.status === 404) {
            return this.handleNotFound(error);
        }
        if (error.status === 400) {
            return this.handleBadRequest(error);
        }
        return '';
    }
    private handleNotFound = (error: HttpErrorResponse): string => {
        this.router.navigate(['/404']);
        return error.message;
    }
    private handleBadRequest = (error: HttpErrorResponse): string => {
        if (this.router.url === '/authentication/register') {
            let message = '';
            const values = Object.values(error.error.errors);
            values.map(m => {
                message += m + '<br>';
            })
            return message.slice(0, -4);
        }
        else {
            return error.error ? error.error : error.message;
        }
    }
}
