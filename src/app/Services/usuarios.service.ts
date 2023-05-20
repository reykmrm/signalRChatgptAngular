import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private hubConnection!: HubConnection;
  private connectionId!: any;

  constructor() {}
  public createSignalRConnection(): void {
    const token = localStorage.getItem('token');
  
    if (token) {
      const hubUrl = 'http://localhost:44339/UsuariosHub';
  
      // Crear la conexión del hub
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(hubUrl, {
          transport: HttpTransportType.WebSockets, // Opcional, ajusta el tipo de transporte según tus necesidades
          accessTokenFactory: () => token
        })
        .build();
  
      // Iniciar la conexión del hub
      this.startHubConnection();
    } else {
      console.error('Token not found in localStorage.');
    }
  }
  

  
  
  private startHubConnection(): void {
    this.hubConnection.start()
      .then(() => {
        console.log('Conexión establecida');
  
        // Escuchar eventos o realizar otras operaciones en la conexión establecida
        this.hubConnection.on('SomeEvent', (data) => {
          console.log('Evento recibido:', data);
        });
      })
      .catch((error) => {
        console.error('Error al conectar:', error);
      });
  }
  // startConnection() {
  //   const hubConnection = new HubConnectionBuilder()
  //     .withUrl('http://localhost:44339/hub', {
  //       accessTokenFactory: () => {
  //         const token = localStorage.getItem('token');
  //         return token || '';
  //       }
  //     })
  //     .build();
  
  //   hubConnection
  //     .start()
  //     .then(() => {
  //       console.log('Hub connection started');
  //       this.connectionId = hubConnection.connectionId;
  //     })
  //     .catch((err) => console.log('Error while starting connection: ' + err));
  // }
  

  public SendUser(User: any) {
    this.hubConnection
      .invoke('CreateUser', User)
      .catch((err) => console.error(err));
  }

  public ResSendUser(callback: (message: string) => void) {
    this.hubConnection.on('UserRegistrado', callback);
  }

  public GetAllUsers() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.hubConnection
      .invoke('GetAllUsers')
      .catch((err) => console.error(err));
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
