import { UsuariosService } from './../../Services/usuarios.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Nombre', 'Usuario', 'Acciones'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  usuario = {
    nombre: '',
    usuario: '',
    clave: '',
    imagen: '',
  };
  idUser: number = 0;
  crear!: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    await this.usuariosService.startConnection();
    setTimeout(() => {
      this.listar();
    }, 100);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async listar() {
    await this.usuariosService.GetAllUsers();
    this.usuariosService.ResGetAllUsers((res: any) => {
      console.log('Respueta de getUserALL', res);
      this.dataSource = new MatTableDataSource(res);
    });
  }

  async CrearUser() {
    let message = '';
    await this.usuariosService.SendUser(this.usuario);
    this.usuariosService.ResSendUser((message) => {
      console.log('Este es el mensaje de guardar', message);
      this.modalService.dismissAll();
      this.toastFuntion(message);
    });
    await this.listar();
  }

  
  async EditUser(idUser: number) {
    this.crear = true;
    this.idUser = idUser;
    await this.usuariosService.getUserById(idUser);
    this.usuariosService.ResgetUserById((res: any) => {
      console.log('....d..d.d', res);
      this.usuario = res;
    });
  }
  async ModificarUser() {
    await this.usuariosService.EditUser(this.idUser, this.usuario);
    this.usuariosService.ResEditUser((message: string) => {
      this.modalService.dismissAll();
      this.toastFuntion(message);
    });
    await this.listar();
  }

  async EliminarUser(idUser: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar este registro?',
      text: 'No podra revertir esta accion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6 ',
      confirmButtonText: 'Si, Eliminarlo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.usuariosService.EliminarUser(idUser);
        this.usuariosService.ResEliminarUser((message: string) => {
          this.toastFuntion(message);
        });
        await this.listar();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //#######################Ventana modal para abrir y editar

  toastFuntion(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }
  closeResult = '';
  open(content: any) {
    this.crear = true;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    let vacio = {
      nombre: '',
      usuario: '',
      clave: '',
      imagen: '',
    };
    this.usuario = vacio;
  }

  EditOpen(content: any) {
    this.crear = false;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    let vacio = {
      nombre: '',
      usuario: '',
      clave: '',
      imagen: '',
    };
    this.usuario = vacio;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

export interface UserData {
  id: number;
  nombre: string;
  usuario: string;
}
