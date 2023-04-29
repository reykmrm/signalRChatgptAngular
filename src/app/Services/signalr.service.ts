import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection!: HubConnection;

  constructor() { }

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
                            .withUrl('https://localhost:7204/chatHub')
                            .build();

    this.hubConnection
        .start()
        .then(() => console.log('Hub connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));
  }

  public sendMessage(user: string, message: string) {
    this.hubConnection.invoke('SendMessage', user, message)
                      .catch(err => console.error(err));
  }

  public registerOnMessageReceived(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }
}
