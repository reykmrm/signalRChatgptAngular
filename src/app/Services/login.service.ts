import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private hubConnection!: HubConnection;
  private connectionId!: any;
  constructor() {}
  conexion = false;

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44339/LoginHub')
      // .withUrl('https://localhost:7204/LoginHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.conexion = true;
        this.connectionId = this.hubConnection.connectionId;
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

   SendLogin(User: any) {
    if(this.conexion){
      this.hubConnection
      .invoke('Login', User)
      .catch((err) => console.error(err));
    }else{
      
    }
    
  }

  ResSendLogin(callback: (token: string) => void) {
    this.hubConnection.on('token', callback);
  }

}
