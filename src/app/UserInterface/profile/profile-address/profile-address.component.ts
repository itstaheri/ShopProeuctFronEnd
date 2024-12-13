import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiUrls } from '../../../apiurls';
import { Common, notificationType } from '../../../app.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from '../../../Services/popup.service';
import { CustomPopupComponent } from '../../../modules/popup/popup.component';

@Component({
  selector: 'app-profile-address',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,HttpClientModule,CommonModule,NgbModule,CustomPopupComponent ],
  templateUrl: './profile-address.component.html',
  styleUrl: './profile-address.component.scss',
  providers : [ApiService,PopupService]

})
export class ProfileAddressComponent implements OnInit,AfterViewChecked    {
  public provinceList! : any
  public cityList! : any
  public Addresses : any
  @ViewChild(CustomPopupComponent) popupComponent!: CustomPopupComponent;


  constructor(private callApi : ApiService,private fb : FormBuilder,private modalService: NgbModal,private popup :PopupService){
  } 
  ngAfterViewChecked(): void {
    debugger
    this.popup.register(this.popupComponent)


  }

  ngOnInit(): void {
    this.InitializeAddressForm();
    this.GetAddress()
  }
  public Addressform! : FormGroup




  InitializeAddressForm(){
    this.Addressform = this.fb.group({

      firstName : [null,Validators.required],
      lastName : [null,Validators.required],
      cityId : [1,Validators.required],
      title : [null,Validators.required],
      description : [null,Validators.required],
      postalCode : [null,Validators.required],
      reciverMobile : [null,Validators.required],
      reciverPhoneNumber : [null] 



    })
  }
  closeModalCreateAddress(content:any){
    this.modalService.dismissAll(content);  

  }
  OpenAddAddressModalEvent(content:any){ 
    debugger
    //  this.InitializeAddressForm()
      this.GetProvinceList();
     this.modalService.open(content);  

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


    this.callApi.CallGetApi(ApiUrls.Profile.GetAddress).subscribe(response=>{
      this.Addresses = response.result;
    })
  }
  AddAddress(){ 
    var requestBody= {
      firstName : this.Addressform.value.firstName,
      lastName : this.Addressform.value.lastName,
      cityId : this.Addressform.value.cityId,
      title : this.Addressform.value.title,
      description : this.Addressform.value.description,
      postalCode : this.Addressform.value.postalCode,
      reciverMobile : this.Addressform.value.reciverMobile,
      reciverPhoneNumber : this.Addressform.value.reciverPhoneNumber,

    }
    debugger
    
    this.callApi.CallPostApi(ApiUrls.Profile.AddAddress,requestBody).subscribe(response=>{
      if(response.message == "OperationSuccess"){
        this.modalService.dismissAll()
        this.popup.show(notificationType.success,"عملیات موفق","افزودن آدرس با موفقیت انجام شد.")
        this.Addressform.reset();
        Object.values(this.Addressform.controls).forEach(control => {

          control.markAsUntouched();
          control.setErrors(null);
        })   
        this.GetAddress()     
      }
    })

  }

}
