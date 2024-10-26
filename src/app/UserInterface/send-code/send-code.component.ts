import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { Common, notificationType } from '../../app.component';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-code',
  standalone: true,
  imports: [],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.scss'
})
export class SendCodeComponent implements OnInit {

  /**
   *
   */
  private readonly checkOtpIdValidUrl : string;
  private readonly checkOtpUrl : string;
  private timeout? : number
  private form! : FormGroup
  constructor(private activatedRoute : ActivatedRoute,private route:Router,private Apiservice:ApiService,private fb:FormBuilder) {
    this.checkOtpIdValidUrl = Common.ReadConfig("CheckOtpIdIsValid")
    this.checkOtpUrl = Common.ReadConfig("CheckOtp")


      
  }
  ngOnInit(): void {

    this.form = this.fb.group({
      Id:['',Validators.required],
      Code : ['',Validators.required]
    })
     var Id =  this.activatedRoute.snapshot.params["Id"]

    if(Id  == undefined){

      this.route.navigate(["/",'auth'])
    }

    if(this.checkIdValid(Id)){
      Common.ShowNotify(notificationType.error,"شناسه یکبار رمز اشتباه می باشد.")
      this.route.navigate(["/",'auth'])

    }else{
      this.form.get("Id")?.setValue(Id)
    }


    
  }

  checkIdValid(Id : string) : boolean{


    var requestBody = {
      Id : Id
    }

    var result = false;

    this.Apiservice.CallPostApiWithoutToken(this.checkOtpIdValidUrl,requestBody).subscribe(response=>{
      
      this.timeout = response[0].Result.Timeout
      result = response[0].Result;
     
    })

    return result;


  }

  checkOtp(){
    var requestBody = {
      Id : this.form.get("Id")?.value,
      Code : this.form.get("Code")?.value
    }

    this.Apiservice.CallPostApi(this.checkOtpUrl,requestBody).subscribe(response=>{

      

    })
  }


}
