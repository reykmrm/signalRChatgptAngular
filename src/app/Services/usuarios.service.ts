import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import {
  HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public hubConnection!: HubConnection;
  private connectionId: any = '';
  token = '';

  constructor() {
    this.startSignalRConnection();
  }

  startSignalRConnection() {
    let tokenString = localStorage.getItem('token');
    if (tokenString) {
      this.token = tokenString;
    }

    // Crea la conexión de SignalR con el token en los parámetros
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44339/UsuariosHub', {
        accessTokenFactory: () => this.token,
      })
      .build();

    // Inicia la conexión
    this.hubConnection
      .start()
      .then(() => {
        // La conexión se estableció correctamente
        this.connectionId = this.hubConnection.connectionId;
        //console.log('Connection ID:', this.connectionId);
      })
      .catch((error) => {
        // Maneja el error de conexión
      });
  }

  public SendUser(User: any) {
    this.hubConnection
      .invoke('CreateUser', User)
      .catch((err) => console.error(err));
  }

  public ResSendUser(callback: (message: string) => void) {
    this.hubConnection.on('UserRegistrado', callback);
  }

  public GetAllUsers() {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('GetAllUsers')
        .catch((err) => console.error(err));
    } else {
      console.error('Hub connection is not initialized.');
    }
  }

  public ResGetAllUsers(callback: (users: any) => void) {
    this.hubConnection.on('GetAllUsersClient', callback);
  }

  public getUserById(id: number) {
    this.hubConnection
      .invoke('GetUserById', id)
      .catch((err) => console.error(err));
  }
  public ResgetUserById(callback: (user: any) => void) {
    this.hubConnection.on('UserById', callback);
  }

  public EditUser(idUser: number, user: any) {
    this.hubConnection
      .invoke('EditUser', idUser, user)
      .catch((err) => console.error(err));
  }
  public ResEditUser(callback: (message: string) => void) {
    this.hubConnection.on('UserEditado', callback);
  }

  public EliminarUser(idUser: number) {
    this.hubConnection
      .invoke('EliminarUser', idUser)
      .catch((err) => console.error(err));
  }
  public ResEliminarUser(callback: (message: string) => void) {
    this.hubConnection.on('UserEliminado', callback);
  }
}
