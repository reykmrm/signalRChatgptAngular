import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../Services/usuarios.service';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.scss'],
})
export class ListFriendsComponent implements OnInit {
  constructor(
    private usuariosService: UsuariosService,
    private modalService: NgbModal
  ) {}
  async ngOnInit() {
    await this.usuariosService.startConnection();
    setTimeout(() => {
      this.GetAllUsers();
    }, 500);
  }
  users: any;

  async GetAllUsers() {
    await this.usuariosService.GetAllUsers();
    this.usuariosService.ResGetAllUsers((res: any) => {
      console.log('Respueta de getUserALL', res);
      this.users = res;
    });
  }
}
