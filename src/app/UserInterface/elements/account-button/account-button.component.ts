import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-account-button',
  standalone: true,
  imports: [],
  templateUrl: './account-button.component.html',
  styleUrl: './account-button.component.scss'
}) 
export class AccountButtonComponent implements OnInit {

  constructor(private auth : AuthService){
 
  }  

  public  isAuthenticated : boolean = false
  
  ngOnInit(): void {
    debugger
    this.isAuthenticated = this.auth.isAuthenticated() 
  }

}
 