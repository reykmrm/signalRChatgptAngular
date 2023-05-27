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
        console.log('Hub connection started chat');
        if (this.idUser) {
          this.addToGroup(this.idUser); // Unirse al grupo después de una conexión exitosa
        }
      })
      .catch((err) => {
        console.log('Error while starting connection: ' + err);
        this.scheduleReconnect(); // Programar reconexión después de un tiempo en caso de error
      });

    this.hubConnection.onreconnected((connectionId) => {
      console.log('Reconnected. Connection ID:', connectionId);
      if (this.idUser) {
        this.addToGroup(this.idUser); // Volver a unirse al grupo después de la reconexión
      }
    });

    this.hubConnection.onclose((error) => {
      console.log('Connection closed. Attempting to reconnect...');
      this.scheduleReconnect(); // Programar reconexión después de un tiempo cuando se cierra la conexión
    });
  }

  scheduleReconnect() {
    setTimeout(() => {
      this.startConnection(); // Volver a intentar la conexión
    }, 5000); // Esperar 5 segundos antes de intentar la reconexión (ajustar según tus necesidades)
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
