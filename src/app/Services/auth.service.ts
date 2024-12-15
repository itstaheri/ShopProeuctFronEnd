import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  login(token : string): void {
    localStorage.setItem("token",token)
 
  }

  logout(): void {
    localStorage.removeItem("token")
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token"); 
  }
}
