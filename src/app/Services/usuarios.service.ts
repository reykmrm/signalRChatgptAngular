import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private hubConnection!: HubConnection;
  private connectionId!: any;

  constructor() {}

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7204/UsuariosHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.connectionId = this.hubConnection.connectionId;
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
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
    this.hubConnection.invoke('GetAllUsers').catch((err) => console.error(err));
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
