import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationResponseDto } from '../response/registrationResponseDto';
import { UserForRegistrationDto } from '../user/userForRegistrationDto';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    readonly baseURL = 'http://localhost:5000/api/accounts'

    public registerUser = (route: string, body: UserForRegistrationDto) => {
        return this.http.post<RegistrationResponseDto>(this.createCompleteRoute(route, this.baseURL), body);
    }

    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }
}
