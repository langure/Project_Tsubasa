import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BackendLinkService } from './backend-link.service';

const isAuthenticated = () => {
  console.log("isAuthenticated called from app-routing.module.ts");
  const authService = inject(BackendLinkService);
  const router = inject(Router);

  authService.check_for_auth().then((result) => {
    console.log("Return value from isAuthenticated: " + result);
    if (!result) {
      router.navigate(['/login']);
    }
  });

};


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [isAuthenticated] },
  { path: 'home', component: HomeComponent, canActivate: [isAuthenticated] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
