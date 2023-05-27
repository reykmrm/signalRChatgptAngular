import { Component, OnInit } from '@angular/core';
import { SignalrService } from './Services/signalr.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user!: string;
  message!: string;
  messages: { user: string; message: string }[] = [];

  constructor(
    private signalRService: SignalrService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.registerOnMessageReceived((message) => {
      console.log(`${message}`);
    });
  }

 
}
