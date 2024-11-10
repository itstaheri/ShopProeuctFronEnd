import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router, RouterModule } from '@angular/router';
import { Common, notificationType } from '../../app.component';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OtpHeaderModel } from '../../Services/models/otp/otpHeaderModel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-send-code',
  standalone: true,
  imports : [ReactiveFormsModule,RouterModule,HttpClientModule,CommonModule ],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.scss',
  providers : [ApiService]

})
export class SendCodeComponent implements OnInit {

  /**
   *
   */
  private readonly checkOtpIdValidUrl : string;
  private readonly loginOrSignUpUrl : string;
  public  message  : String;
  public status : number =1;
  private timeout? : number 
  public form! : FormGroup
  private Id? : string;
  
  constructor(private activatedRoute : ActivatedRoute,private route:Router,private Apiservice:ApiService,private fb:FormBuilder) {
    this.checkOtpIdValidUrl = Common.ReadConfig("CheckOtpIdIsValid")
    this.loginOrSignUpUrl = Common.ReadConfig("CheckOtp")

                                   
                                   
    this.message = " یک کد برای شما پیامک شد لطفا آن را وارد کنید"
    this.status = 1;
      
  }
  ngOnInit(): void {

    debugger
    this.form = this.fb.group({
      Id:['',Validators.required],
      Code : ['',Validators.required]
    })
   this.Id =  this.activatedRoute.snapshot.params["Id"]

    if(this.Id  == undefined){

      debugger
      this.route.navigate(["/",'auth'])
    }

    // if(this.checkIdValid(Id)){
    //   Common.ShowNotify(notificationType.error,"شناسه یکبار رمز اشتباه می باشد.")
    //   this.route.navigate(["/",'auth'])

    // }else{
    //   this.form.get("Id")?.setValue(Id)
    // }


    
  }

  // checkIdValid(Id : string) : boolean{


  //   var requestBody = {
  //     Id : Id
  //   }

  //   var result = false;

  //   this.Apiservice.CallPostApiWithoutToken(this.checkOtpIdValidUrl,requestBody).subscribe(response=>{
      
  //     this.timeout = response[0].Result.Timeout
  //     result = response[0].Result;
     
  //   })

  //   return result;


  // }

  checkOtp(){
  debugger;
    var otp =new  OtpHeaderModel();

    var request = {
      PhoneNumber :  this.Id
    }
    otp.Refrence = this.Id;
    otp.Code = this.form.get("Code")?.value;

    this.Apiservice.CallPostApiWithoutToken("/v1/Auth/LoginOrSignupWithPhone",request,otp ).subscribe(response=>{

      debugger
      console.log(response)
      if(response["message"] == "OperationSuccess"){
        this.status = 1;
        this.message = "ورود موفق"
        this.route.navigate(["/","profile"])


      }
     else if(response["message"]== "OTPWrong") 
      {
        this.status = 2;
        this.message = "یکبار رمز وارد شده اشتباه است."

      }else if(response["message"] == "OTPNotActive"){
         this.status = 2;
        this.message = "یکبار رمز معتبر نیست"
      }
      else if(response["message"] == "OTPExpierd"){
        this.status = 2;
       this.message = "یکبار رمز غیر فعال شده است لطفا دوباره درخواست بدهید"
     }

      

    })
  }


}
