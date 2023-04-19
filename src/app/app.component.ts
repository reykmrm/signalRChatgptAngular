import { Component, OnInit } from '@angular/core';
import { SignalrService } from './Services/signalr.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user!: string;
  message!: string;
  messages: { user: string, message: string }[] = [];

  constructor(private signalRService: SignalrService) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.registerOnMessageReceived((user, message) => {
      console.log(`${user}: ${message}`);
      this.messages.push({ user, message });
    });
  }

  sendMessage() {
    this.signalRService.sendMessage(this.user, this.message);
    this.message = '';
  }
}
