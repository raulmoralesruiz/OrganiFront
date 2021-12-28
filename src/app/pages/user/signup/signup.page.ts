import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserSignupInterface } from '../models/user-signup.interface';
import { UserInterface } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  /* Formulario de login */
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+)'),
    ]),
    first_password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}'),
    ]),
    second_password: new FormControl('', Validators.required),
  });

  /* Variable utilizada para ocultar la contraseña */
  hideFirstPass = true;
  hideSecondPass = true;

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  signup() {
    let user: UserInterface = {
      name: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.first_password,
    };

    this.userService.signup(user).subscribe(
      (res) => {
        if (res.success) {
          // se muestra mensaje de bienvenida
          this.alertInfo('Welcome!', res.message)

          // se redirige a componente create/update
          this.router.navigate(['/login']);
        } else {
          // se muestra mensaje de error
          this.alertError(res.message);
        }
      },
      (err) => {}
    );
  }

  /* Alerta con mensaje de error */
  async alertError(errorMessage) {
    const alert = await this.alertController.create({
      cssClass: 'alert-danger',
      header: 'Error',
      message: errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  /* Alerta de información */
  async alertInfo(head: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-ok',
      header: head,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}