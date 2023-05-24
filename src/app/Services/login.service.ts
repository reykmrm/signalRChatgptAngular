import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private hubConnection!: HubConnection;
  private connectionId!: any;
  constructor() {
    this.startSignalRConnection();
  }
  conexion = false;
  token = '';

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44339/LoginHub')
      // .withUrl('https://localhost:7204/LoginHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started login');
        this.conexion = true;
        this.connectionId = this.hubConnection.connectionId;
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
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
