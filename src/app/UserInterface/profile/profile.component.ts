import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Common, formType, notificationType } from '../../app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiUrls } from '../../apiurls';
import { ProfileInfoModel } from '../../models/Profile/profileinfo.model';
import { profile } from 'console';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers : [ApiService]
})
export class ProfileComponent implements OnInit {
  constructor(private callApi : ApiService,private fb : FormBuilder){

    this.Section =  ProfileSection.Home;
  }

  public provinceList! : any
  public cityList! : any

 public Addressform! : FormGroup
 public ProfileForm! : FormGroup

 public Addresses : any
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
  InitializeAddressForm(){
    this.Addressform = this.fb.group({

      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      cityId : [1,Validators.required],
      title : ['',Validators.required],
      description : ['',Validators.required],
      postalCode : ['',Validators.required],
      reciverMobile : ['',Validators.required],
      reciverPhoneNumber : [''] 



    })
  }
  GetProvinceList(){
     this.callApi.CallGetApi(ApiUrls.Lookup.GetProvinceList).subscribe(response=>{
      this.provinceList = response.result;
      console.log(this.provinceList)
     })
  }
  GetCityList(provinceId: Number){
    console.log("--------------------------------")
    var requestParam = {
      provinceId : provinceId
    }
    this.callApi.CallGetApi(ApiUrls.Lookup.GetCityList,provinceId).subscribe(response=>{
      this.cityList = response.result;
     })
  }
  GetAddress(){
    debugger
    console.log(this.Addresses.length)
    if(this.Addresses.length != 0)
      return;
      
    this.Section =  ProfileSection.Addresses;
    this.MakeEmpty(); 

    this.callApi.CallGetApi(ApiUrls.Profile.GetAddress).subscribe(response=>{
      this.Addresses = response.result;
    })
  }
  GetComments(){
    if(this.Comments.length != 0)
      return;
    this.MakeEmpty();

  } 
  GetOrders(){

    if(this.Orders == null)
      return;
      
    this.Section =  ProfileSection.Orders; 
    this.MakeEmpty();

  }
  GetNotifications(){
    this.MakeEmpty();

  }
  GetProfileInfo(){ 


    debugger
    this.Section = ProfileSection.Home
    this.MakeEmpty();

    this.callApi.CallGetApi(ApiUrls.Profile.GetProfile).subscribe(response=>{
      this.ProfileInfo = response.result;
      this.ProfileInfo.phoneNumber = response.result.userInfo.phoneNumber
      console.log(this.ProfileInfo)
    })
     

  }
  OpenAddAddressModalEvent(){
    this.InitializeAddressForm()
    this.GetProvinceList();
  }
 
  MakeEmpty(){
    this.Addresses = []
    this.Comments = []
    this.Notifications = [] ;
    this.Orders = []
  }

  AddAddress(){
    var requestBody=  JSON.stringify(this.Addressform.value)
    this.callApi.CallPostApi(ApiUrls.Profile.AddAddress,requestBody).subscribe(response=>{
      if(response.message == "OperationSuccess"){
        Common.ShowNotify(notificationType.success,"عملیات با موفقیت انجام شد.")
      }
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
