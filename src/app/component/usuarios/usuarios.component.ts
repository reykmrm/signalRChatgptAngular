import { UsuariosService } from './../../Services/usuarios.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
    nombre: 'Lorena1',
    usuario: 'Lorenita1',
    clave: '123456',
    imagen: 'holahola',
  };

  constructor(private usuariosService: UsuariosService) {}

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface UserData {
  id: number;
  nombre: string;
  usuario: string;
}
