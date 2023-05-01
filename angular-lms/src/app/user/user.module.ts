import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { CoursesModule } from './courses/courses.module';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    CoursesModule
  ]
})
export class UserModule { }
