import { Component, OnInit } from '@angular/core';
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
    public auxService: AuxiliarService
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
    console.log('Usuario', this.usuario);
    debugger;
    await this.loginService.SendLogin(this.usuario);
    this.loginService.ResSendLogin((token) => {
      console.log(token);
      if (token != 'false') {
        localStorage.setItem('token', token);
        this.auxService.toastFuntion('Ok!');
        setTimeout(() => {}, 500);
        return;
      }
      this.auxService.toastFuntion(token);
    });
  }
}
