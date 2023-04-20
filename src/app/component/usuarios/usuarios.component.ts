import { UsuariosService } from './../../Services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  usuario = {
    nombre: 'Lorena',
    usuario: 'Lorenita',
    clave: '123456',
    imagen: 'jsjsjjsjsjsjsjjjs',
  };

  constructor(private usuariosService: UsuariosService) {}

  async ngOnInit(): Promise<void> {
    await this.usuariosService.startConnection();
    // this.SendUser();
    this.usuariosService.ResSendUser((message: string) => {
      console.log(`${message}`);
    });
  }

  SendUser() {
    this.usuariosService.SendUser(this.usuario);
  }
}
