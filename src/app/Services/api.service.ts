import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Common } from '../app.component';
import { OtpHeaderModel } from '../models/otp/otpHeaderModel';
@Injectable({
    providedIn: 'root',
    
  })

  export class ApiService {

    static currentUser : any={
         
    };


    constructor(private http: HttpClient,private router: Router) {
    }


    

    
    public  CallPostApi(customUrl: string, apiBody: any) {
      let currentUser:any= JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser == null || currentUser.TokenID == null)
        this.router.navigate(['/auth']);
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ currentUser.TokenID          
        })
      };

      return this.http.post<any>(Common.rootBaseUrl + customUrl, apiBody, httpOptions);
    }
    
    public  CallPostApiWithCaptcha(customUrl: string, apiBody: any) {
      debugger;
        let currentUser:any= JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (currentUser == null || currentUser.TokenID == null)
        this.router.navigate(['/login']);

      // let userCaptcha:any = JSON.parse(localStorage.getItem('userCaptcha') || '{}');
      
      // if (!userCaptcha || userCaptcha.code.length == 0){
      //   throw new Error("لطفا کد امنیتی  را وارد نمایید");
      // }
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ currentUser.TokenID,
        })
      };
      

      return this.http.post<any>(Common.rootBaseUrl + customUrl, apiBody, httpOptions);
    }

    public  CallPostApiWithReturnType<returnType>(customUrl: string, apiBody: any): Observable<returnType> {
      let currentUser:any= JSON.parse(localStorage.getItem('currentUser') || '{}');

      if (currentUser == null || currentUser.TokenID == null)
        this.router.navigate(['/auth']);
      
        if (currentUser == null || currentUser.TokenID == null){
          throw new Error("لطفا کد امنیتی  را وارد نمایید");
        }
        
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ currentUser.TokenID
          })
        };

      return this.http.post(Common.rootBaseUrl + customUrl, apiBody, httpOptions) as Observable<returnType>;
    }

    public  CallGetApi(customUrl: string , params?: any) {
      let currentUser:any= JSON.parse(localStorage.getItem('currentUser') || '{}');

      if (currentUser == null || currentUser.TokenID == null)
        this.router.navigate(['/auth']);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ currentUser.TokenID
        }),
        params : params
      };

      return this.http.get<any>(Common.rootBaseUrl + customUrl, httpOptions);
    }

    public  CallGetApiWithReturnType<returnType>(customUrl: string , params?: any) : Observable<returnType>{

      let currentUser:any= JSON.parse(localStorage.getItem('currentUser') || '{}');

      if (currentUser == null || currentUser.TokenID == null)
        this.router.navigate(['/auth']);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ currentUser.TokenID
        }),
        params : params
      };

      return this.http.get(Common.rootBaseUrl + customUrl, httpOptions) as Observable<returnType>;
    }

    public  CallGetApiWithoutToken(customUrl: string, params?: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params : params
      };

      return this.http.get<any>(Common.rootBaseUrl + customUrl, httpOptions);

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

      return this.http.post<any>(Common.rootBaseUrl + customUrl, apiBody, httpOptions);

    }

  }
