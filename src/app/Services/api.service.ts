import {AfterViewInit, Component, inject, Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpResponse} from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Common } from '../app.component';
import { OtpHeaderModel } from '../models/otp/otpHeaderModel';
import { Token } from '../models/token.model';
import { response } from 'express';
import { PopupService } from './popup.service';
import { CustomPopupComponent, notificationType } from '../modules/popup/popup.component';
@Injectable({
    providedIn: 'root',
    
  })

  export class ApiService implements AfterViewInit {

    static currentUser : any={
         
    };
  @ViewChild(CustomPopupComponent) popupComponent!: CustomPopupComponent;


    constructor(private http: HttpClient,private router: Router,private popupService : PopupService) {


    }
  ngAfterViewInit(): void {
    this.popupService.register(this.popupComponent)

  }




    public userAuthenticated() : boolean{
      let token:any= localStorage.getItem('token');

      if(token == null || token == undefined) {

        return false;
      }
      return true;
    }

    private getToken() : string{

      debugger
      let token:any= localStorage.getItem('token') ?? '';
     
      return token;


      
    }

    
    public  CallPostApi(customUrl: string, apiBody: any) {
      debugger
       
      let token : string = this.getToken();
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token    
        })
      };

      return this.http.post<any>(Common.rootBaseUrl + customUrl,apiBody,{observe:'response',...httpOptions}).pipe(map((response : HttpResponse<any>)=>{

        this.checkStatus(response.status)
        return response.body;
      }));    }
    
    
    
    public  CallGetApi(customUrl: string , params?: any) {

      let token : string = this.getToken();


      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token 
        }),
        params : params
      };

      return this.http.get<any>(Common.rootBaseUrl + customUrl,{observe:'response',...httpOptions}).pipe(map((response : HttpResponse<any>)=>{

        debugger
        this.checkStatus(response.status)
        return response.body;
      }));
    }



    public  CallGetApiWithoutToken(customUrl: string, params?: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params : params
      };

      
      return this.http.get<any>(Common.rootBaseUrl + customUrl,{observe:'response',...httpOptions}).pipe(map((response : HttpResponse<any>)=>{

        this.checkStatus(response.status)
        return response.body;
      }));   

    }

    public  CallPostApiWithoutToken(customUrl: string, apiBody?: any,otp? : OtpHeaderModel) {
      
      
       var httpOptions = null;

debugger
      if(otp!=null || otp!=undefined)
      {
        httpOptions =
{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "OTP":JSON.stringify(otp)
        })
      };
    }
      else{
        httpOptions =
{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
        
      }

      return this.http.post<any>(Common.rootBaseUrl + customUrl,apiBody,{observe:'response',...httpOptions}).pipe(map((response : HttpResponse<any>)=>{

        this.checkStatus(response.status)
        return response.body;
      }));   
    }

    private checkStatus(statusCode : number){
      debugger
            if (statusCode === 500) {
              this.popupService.show(notificationType.error,'خطای سرور', 'مشکلی در سرور رخ داده است. لطفاً بعداً تلاش کنید.');
            } else if (statusCode === 404) {
              this.popupService.show(notificationType.error,'خطای 404', 'منبع موردنظر یافت نشد.');
            } else if (statusCode === 401) {
              this.popupService.show(notificationType.error,'عدم احراز هویت', 'لطفاً وارد حساب کاربری خود شوید.');
            } else if (statusCode === 400) {
              this.popupService.show(notificationType.error,'خطای اعتبار سنجی', 'لطفاً وارد حساب کاربری خود شوید.');
          }
    }

  }
