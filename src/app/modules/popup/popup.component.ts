import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-popup',
  standalone : true,
  imports : [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class CustomPopupComponent {
 public isVisible = false;
  title = '';
  message = ''; 
  public type!  : notificationType

  show(notificationType :number, title: string, message: string) {
    debugger
    this.title = title;
    this.message = message;
    this.isVisible = true;
    this.type = notificationType;
  }
  
  close() { 
    this.isVisible = false;
  }
}

export enum notificationType{

  success,
  warning,
  error
}