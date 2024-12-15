import { Component, OnInit } from '@angular/core';
import { AccountButtonComponent } from '../elements/account-button/account-button.component';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
 public isAuthenticated: boolean = false;
  constructor(private auth : AuthService){

  }
  ngOnInit(): void {
    debugger
    this.isAuthenticated = this.auth.isAuthenticated() 
  }


}
