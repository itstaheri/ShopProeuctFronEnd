import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router, RouterModule } from '@angular/router';
import { Common, notificationType } from '../../app.component';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OtpHeaderModel } from '../../models/otp/otpHeaderModel';
import { ApiUrls } from '../../apiurls';
import { interval, map, take } from 'rxjs';
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

  public  message!  : String;
  public status : number =1;
  private timeout? : number 
  public form! : FormGroup
  private Id? : string;
  private channel = 1;
  totalTime: number = 180;  
  minutes: number = 0;
  seconds: number = 0;

  public otpExpire  : boolean = false;
  constructor(private activatedRoute : ActivatedRoute,private route:Router,private Apiservice:ApiService,private fb:FormBuilder) {

                                   
                                   
    this.status = 1;
      
  }
  ngOnInit(): void {
    debugger
    this.form = this.fb.group({
      Id:['',Validators.required],
      Code : ['',Validators.required]
    })
   this.Id =  this.activatedRoute.snapshot.params["Id"]
   this.channel =  this.activatedRoute.snapshot.params["channel"]

   debugger
    if(this.Id  == undefined  || this.channel == undefined){

      debugger
      this.route.navigate(["/",'auth'])
    }

    this.startTimer()
    this.checkIdValid(this.Id);
    this.message =  `کد یکبار رمز برای شماره : ${this.Id} ارسال شد.`



    // if(this.checkIdValid(Id)){
    //   Common.ShowNotify(notificationType.error,"شناسه یکبار رمز اشتباه می باشد.")
    //   this.route.navigate(["/",'auth'])

    // }else{
    //   this.form.get("Id")?.setValue(Id)
    // }


    
  }

  async startTimer() {
    const countdown$ = interval(1000).pipe(
      take(this.totalTime), 
      map((elapsedTime) => this.totalTime - elapsedTime - 1)  
    );



    countdown$.subscribe({
      next: (timeLeft) => this.updateTime(timeLeft),
      complete: () =>{
        this.message = "زمان شما برای وارد کردن یکبار رمز منقضی شد لطفا مجدد درخواست بدهید."
        this.status = 2
        this.disableOtp(this.Id) 
      }
    });
  }
  updateTime(timeLeft: number) {
    this.minutes = Math.floor(timeLeft / 60);  
    this.seconds = timeLeft % 60; 
  }

  disableOtp(Id? : string){
  

    var req = {

      Key : Id
    }
    this.Apiservice.CallPostApiWithoutToken(ApiUrls.DisableOtp,req).subscribe(response=>{
      if(response.result == true){

        this.otpExpire = true;

      }
    })
  }

  otpRequest(){
    debugger;
    var request = {
      Refrence : this.Id,
      Channel : this.channel

    }
    
  this.Apiservice.CallPostApiWithCaptcha(ApiUrls.OtpRequest,request).subscribe(respons=>{


         if(respons["message"] == "OperationSuccess"){

           this.startTimer()
           this.message =  `کد یکبار رمز برای شماره : ${this.Id} ارسال شد.`
           this.status  = 1
           this.otpExpire = false;
         }

        
  })

    
  }


  checkIdValid(Id? : string) {


    var requestBody = {
      Key : Id
    }


    this.Apiservice.CallGetApiWithoutToken(ApiUrls.OtpExist,requestBody).subscribe(response=>{
      
      if(response.result == false)
        this.route.navigate(["/",'auth'])

     
    })



  }

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
       this.message = "یکبار رمز منقضی شده است لطفا دوباره درخواست بدهید"
     }

      

    })
  }


}
