import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Common } from '../app.component';
import { OtpHeaderModel } from '../models/otp/otpHeaderModel';
import { Token } from '../models/token.model';
@Injectable({
    providedIn: 'root',
    
  })

  export class ApiService {

    static currentUser : any={
         
    };


    constructor(private http: HttpClient,private router: Router) {
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
      let token:any= localStorage.getItem('token');

      if(token == null || token == undefined) {
        this.router.navigate(['/auth']);

      }
     
     

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

      return this.http.post<any>(Common.rootBaseUrl + customUrl, apiBody, httpOptions);
    }
    
    
    
    public  CallGetApi(customUrl: string , params?: any) {

      let token : string = this.getToken();


      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token 
        }),
        params : params
      };

      return this.http.get<any>(Common.rootBaseUrl + customUrl, httpOptions);
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
