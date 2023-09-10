import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { FavouritesComponent } from './components/favourites/favourites/favourites.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'prefix' },
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {path: 'favourites', component: FavouritesComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
