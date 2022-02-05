import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { UserForRegistrationDto } from '../../user/userForRegistrationDto';
import { AuthenticationService } from './../../shared/authentication.service';


@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

    public registerForm: FormGroup;
    constructor(private authService: AuthenticationService, private passConfValidator: PasswordConfirmationValidatorService) { }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            FirstName: new FormControl(''),
            LastName: new FormControl(''),
            Email: new FormControl('', [Validators.required, Validators.email]),
            Password: new FormControl('', [Validators.required]),
            ConfirmPassword: new FormControl('')
        });
        this.registerForm.get('ConfirmPassword').setValidators([Validators.required, this.passConfValidator.validateConfirmPassword(this.registerForm.get('Password'))]);
    }

    public validateControl = (controlName: string) => {
        return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.registerForm.controls[controlName].hasError(errorName)
    }

    public registerUser = (registerFormValue) => {
        const formValues = { ...registerFormValue }
        const user: UserForRegistrationDto = {
            FirstName: formValues.FirstName,
            LastName: formValues.LastName,
            Email: formValues.Email,
            Password: formValues.Password,
            ConfirmPassword: formValues.ConfirmPassword
        }
        this.authService.registerUser("registration", user)
            .subscribe(_ => {
                console.log("Successful registration");
            }, error => {
                console.log(error.error.errors);
            })
    }
}
