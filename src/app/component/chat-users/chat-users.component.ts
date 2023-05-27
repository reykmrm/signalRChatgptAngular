import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/Services/signalr.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit {
  constructor(private signalrService: SignalrService) {}
  mensaje = 'hola';
  ngOnInit() {}

  async sendMessage() {
    await this.signalrService.sendMessageToGroup(this.mensaje);
    this.signalrService.registerOnMessageReceived((message: string) => {
      console.log(message);
      this.mensaje = '';
    });
  }
}
