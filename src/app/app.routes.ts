import { NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './UserInterface/auth/auth.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './UserInterface/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: AuthComponent,
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
