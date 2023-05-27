import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuxiliarService } from 'src/app/Services/auxiliar.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public auxService: AuxiliarService,
    public route: Router,
  ) {}
  usuario = {
    nombre: '',
    usuario: '',
    clave: '',
    imagen: '',
  };

  async ngOnInit() {
    await this.loginService.startConnection();
  }
  async Login() {
    await this.loginService.SendLogin(this.usuario);
    this.loginService.ResSendLogin((token) => {
      console.log(token);
      if (token != 'false') {
        localStorage.setItem('token', token);
        localStorage.setItem('id', this.usuario.usuario);
        this.route.navigate(['/usuarios']);
        this.auxService.toastFuntion('Ok!');
        setTimeout(() => {}, 500);
        this.loginService.startSignalRConnection();
        return;
      }
      this.auxService.toastFuntion(token);
    });
  }
}
