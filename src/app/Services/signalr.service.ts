import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: HubConnection;
  idUser = localStorage.getItem('id');
  conectado = false;
  constructor() {
    this.startConnection();

    // setTimeout(() => {
    //   if (this.idUser) {
    //     this.addToGroup(this.idUser);
    //   }
    // }, 500);
  }

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44339/chatHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.conectado = true;
        if (this.conectado == true) {
          setTimeout(() => {
            if (this.idUser) {
              this.addToGroup(this.idUser);
            }
          }, 500);
        }
        console.log('Hub connection started chat');
      })
      .catch((err) => {
        this.removeFromGroup();
        console.log('Error while starting connection: ' + err);
      });
  }

  public sendMessage(message: string) {
    this.hubConnection
      .invoke('SendMessage', this.idUser, message)
      .catch((err) => console.error(err));
  }

  public registerOnMessageReceived(callback: (mensaje: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public addToGroup(groupName: string) {
    this.hubConnection
      .invoke('AddToGroup', groupName)
      .catch((err) => console.error(err));
  }

  public sendMessageToGroup(message: string) {
    this.hubConnection
      .invoke('SendMessageToGroup', this.idUser, message)
      .catch((err) => console.error(err));
  }

  public removeFromGroup() {
    this.hubConnection
      .invoke('RemoveFromGroup', this.idUser)
      .catch((err) => console.error(err));
  }
}
