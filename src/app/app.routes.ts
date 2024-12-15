import { NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './UserInterface/auth/auth.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './UserInterface/home/home.component';
import { SendCodeComponent } from './UserInterface/send-code/send-code.component';
import { ProfileComponent } from './UserInterface/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {

    path : '',
    component : HomeComponent,

  },
 
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'auth', 
        component: AuthComponent,
    },

    {
      path: 'sendcode',
      component: SendCodeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [authGuard]
},
{

  path : '**',
  component : HomeComponent,

},



];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router){
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        // let urls=e.url.split('/');
        // if (urls[1] == 'fa' || urls[1] == 'en')
        //   localStorage.setItem('language', urls[1]);
        // else if (urls[2] == 'fa' || urls[2] == 'en')
        //   localStorage.setItem('language', urls[2]);

        // language = localStorage.getItem("language");
      }
    });

  }
}
