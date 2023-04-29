import { Injectable } from '@angular/core';
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

  public SendUser(user: any) {
    this.hubConnection
      .invoke('CreateUser', user)
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
}
