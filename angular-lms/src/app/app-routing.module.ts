import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { StartingPageComponent } from './starting-page/starting-page/starting-page.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [
  {path: 'auth', component: AuthenticationComponent},
  {path: 'user', component: UserComponent},
  {path: '', component: StartingPageComponent},
  {path: '**', component: StartingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
