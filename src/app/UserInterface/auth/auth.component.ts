import { Component, OnInit } from '@angular/core';
import { Common, notificationType } from '../../app.component';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  imports : [ReactiveFormsModule,RouterModule,HttpClientModule],
  standalone : true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers : [ApiService]
})
export class AuthComponent implements OnInit {
  
  //service
  private _callApi : ApiService;
  private _formBuilder : FormBuilder;

  //flags
 private enableOtpPage : boolean = false

  //url
  private readonly otpRequestUrl : string;
  
  constructor(private callApi : ApiService,private formBuilder : FormBuilder){
    this._callApi = callApi;
    this._formBuilder = formBuilder;
    this.otpRequestUrl = Common.ReadConfig("OtpRequest")
    
  }
  public form!: FormGroup;

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      Refrence : ['',Validators.required]

    })
  }
  public otpRequest(){
    debugger;
    var request = {
      Refrence : this.form.value.Refrence,
      Channel : 1

    }
    
  this.callApi.CallGetApiWithoutToken(this.otpRequestUrl,request).subscribe(respons=>{
    if(respons[0].StatusCode== 200){
      this.enableOtpPage  = true
    }
  })
    
  }
  

}
