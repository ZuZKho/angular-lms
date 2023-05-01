import { Component } from '@angular/core';
import { Course } from 'src/shared/interfaces/course.interface';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { CoursesService } from 'src/shared/services/courses.service';
import { StoreService } from 'src/shared/services/store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  
  constructor(public storeService: StoreService, private coursesService: CoursesService, private authService: AuthenticationService) {
    if (this.authService.userInfo) {
      this.coursesService.getCoursesListByUserUID(this.authService.userInfo.uid);
    }
  }

  onCourseCreation: boolean = false;
  onCourses: boolean = true;

 /* courses = [
    {
      title: 'Русский язык',
      date: new Date(),
      creator: 'Марина Николаевная'
    },
    {
      title: 'Информатика',
      date: new Date('12.12.2022'),
      creator: 'Светлана Геннадьевна'
    },
    {
      title: 'Русский язык',
      date: new Date(),
      creator: 'Марина Николаевная'
    },
    {
      title: 'Информатика',
      date: new Date('12.12.2022'),
      creator: 'Светлана Геннадьевна'
    }
  ]*/

  toCourseCreation() {
    this.onCourses = false;
    this.onCourseCreation = true;
  }

  toCourses() {
    this.onCourseCreation = false;
    this.onCourses = true;
  }

}
