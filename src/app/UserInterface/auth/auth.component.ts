import { Component, OnInit } from '@angular/core';
import { Common, notificationType } from '../../app.component';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '../../app.routes';
import { ApiUrls } from '../../apiurls';

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
  public label = "";
  //flags
 private enableOtpPage : boolean = false

  //url
  
  constructor(private callApi : ApiService,private formBuilder : FormBuilder,private route:Router,){
    this._callApi = callApi;
    this._formBuilder = formBuilder;
    
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
    
  this.callApi.CallPostApiWithoutToken(ApiUrls.OtpRequest,request).subscribe(respons=>{
    
    console.log(respons)
    debugger;
    if(respons["message"] == "ActiveOtpExist")
      this.label = "یکبار رمز ارسال شده است."
    else if(respons["message"] == "OperationSuccess"){
      this.route.navigate(['/','sendcode',{Id : request.Refrence,channel : request.Channel}]);

  
    }
  })

    
  }
  

}
