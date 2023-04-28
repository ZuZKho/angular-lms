import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { HelperComponent } from './helper/helper.component';
import { MainComponent } from './main/main/main.component';

const routes: Routes = [
  {path: 'auth', component: AuthenticationComponent},
  {path: 'user', component: HelperComponent},
  {path: '', component: MainComponent},
  {path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
