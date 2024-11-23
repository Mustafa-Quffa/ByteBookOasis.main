import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { AdminGuard } from './guards/admin.guard';
import { BrowseComponent } from './browse/browse.component';







export const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
      { path: 'users', component: AdminUsersComponent, canActivate: [AdminGuard] },
      { path: 'books', component: AdminBooksComponent, canActivate: [AdminGuard] },
    ]
  },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'about us', component: AboutUsComponent},
  {path: 'profile',component:ProfileComponent},
  {path: 'reset-password', component:ResetPasswordComponent},
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'Browse', component: BrowseComponent },
  {path: 'forgot-password',component:ForgotPasswordComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FlexLayoutModule,FontAwesomeModule],
  exports: [RouterModule,FontAwesomeModule]
})
export class AppRoutingModule { }
