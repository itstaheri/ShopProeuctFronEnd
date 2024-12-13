import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Common, formType, notificationType } from '../../app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiUrls } from '../../apiurls';
import { ProfileInfoModel } from '../../models/Profile/profileinfo.model';
import { profile } from 'console';
import { ProfileAddressComponent } from './profile-address/profile-address.component';
import { CustomPopupComponent } from '../../modules/popup/popup.component';
 
@Component({ 
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,HttpClientModule,CommonModule,ProfileAddressComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers : [ApiService]
})
export class ProfileComponent implements OnInit,AfterViewInit  {
  @ViewChild(CustomPopupComponent) popupComponent!: CustomPopupComponent;

  constructor(private callApi : ApiService,private fb : FormBuilder){

    this.Section =  ProfileSection.Home;
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }



 public ProfileForm! : FormGroup

 public ProfileInfo! : ProfileInfoModel
 public Orders : any
 public Notifications : any
 public Comments : any

  public Section : ProfileSection;

  ngOnInit(): void {

    this.GetProfileInfo()
    debugger
  }

  InitializeProfileForm(){
    this.ProfileForm = this.fb.group({
      

    })
  }


  GetComments(){
    if(this.Comments.length != 0)
      return;

  } 
  GetOrders(){

    if(this.Orders == null)
      return;
      
    this.Section =  ProfileSection.Orders; 

  }
  GetNotifications(){

  }

  GetAddress(){
 
    this.Section =  ProfileSection.Addresses; 
  }
  GetProfileInfo(){ 


    debugger
    this.Section = ProfileSection.Home

    this.callApi.CallGetApi(ApiUrls.Profile.GetProfile).subscribe(response=>{
      this.ProfileInfo = response.result;
      this.ProfileInfo.phoneNumber = response.result.userInfo.phoneNumber
      console.log(this.ProfileInfo)
    })
     

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
