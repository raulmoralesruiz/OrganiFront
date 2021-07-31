import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../models/user.interface';
import { UserService } from '../services/user.service';
import jwt_decode from 'jwt-decode';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /* Formulario de login */
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  /* Variable utilizada para ocultar la contraseña */
  hidePass = true;

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  login() {
    let itemFormObject: UserInterface = this.loginForm.getRawValue();

    this.userService.login(itemFormObject).subscribe(
      (res) => {
        // se guarda el token
        let token = res['token'];

        // se descodifica el token
        let jwtDecode = jwt_decode(token);

        // se guarda los datos del usuario obtenidos en el token
        localStorage.setItem('user_id', jwtDecode['user_id']);
        localStorage.setItem('token_expire', jwtDecode['exp']);
        localStorage.setItem('token', token);

        // se muestra mensaje de bienvenida
        this.loginOk();

        // se redirige a componente create/update
        this.router.navigate(['/welcome']);
      },
      (error) => {
        // se muestra mensaje de error
        if (error.status == 401) {
          this.loginError();
        }
      }
    );
  }

  /* Alerta con mensaje de error */
  async loginError() {
    const alert = await this.alertController.create({
      cssClass: 'alert-danger',
      header: 'Error 401',
      message: 'Unauthorized access',
      buttons: ['OK']
    });

    await alert.present();
  }

  /* Alerta con mensaje de bienvenida */
  async loginOk() {
    const alert = await this.alertController.create({
      cssClass: 'alert-ok',
      header: 'Welcome!',
      message: "it's time to organize!",
      buttons: ['OK']
    });

    await alert.present();
  }

}
