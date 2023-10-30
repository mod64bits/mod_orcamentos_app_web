import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/authRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  contatoForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    whatsapp: ['', Validators.required],
    mensagem: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
    ){}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.access);
            this.loginForm.reset();

          }
        },
        error: (err) => console.log(err)
      })
    }

  }

  onSubmitContatoForm(): void {
    console.log('Formulario de Contato', this.contatoForm.value)

  }
}
