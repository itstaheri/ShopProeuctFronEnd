import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { formType } from '../../app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers : [ApiService]
})
export class ProfileComponent implements OnInit {
  constructor(callApi : ApiService,private fb : FormBuilder){

    this.Section =  ProfileSection.Home;
  }

 public Addressform! : FormGroup
 public ProfileForm! : FormGroup

 public Addresses : any
 public ProfileInfo : any
 public Orders : any
 public Notifications : any
 public Comments : any

  public Section : ProfileSection;

  ngOnInit(): void {

    debugger
  }

  InitializeProfileForm(){
    this.ProfileForm = this.fb.group({
      

    })
  }
  InitializeAddressForm(){
    this.Addressform = this.fb.group({
      

    })
  }
  GetAddress(){
      

    this.MakeEmpty();
  }
  GetComments(){
    this.MakeEmpty();

  }
  GetOrders(){
    debugger
    this.Section =  ProfileSection.Orders; 
    this.MakeEmpty();

  }
  GetNotifications(){
    this.MakeEmpty();

  }
  GetProfileInfo(){
    this.Section = ProfileSection.Home
    this.MakeEmpty();

  }

  MakeEmpty(){
    this.Addresses = []
    this.Comments = []
    this.Notifications = []
    this.ProfileInfo = null
    this.Orders = []
  }


}
enum ProfileSection{
  Home = 1,
  Orders = 2,
  Comments = 3,
  Notifications = 4,
  Tickets = 5,
  Addresses = 6
}
