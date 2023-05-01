import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/shared/services/courses.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent {

  @Output() returnToCourses = new EventEmitter<void> ();

  constructor(private coursesService: CoursesService) {}

  newCourseFormOnSubmit: boolean = false;

  newCourseForm = new UntypedFormGroup({
    newCourseInputTitle: new UntypedFormControl(null, [Validators.required])
  })

  get newCourseInputTitle() {return this.newCourseForm.get('newCourseInputTitle'); }

  createNewCourse() {
    if (this.newCourseForm.invalid) return;
    this.coursesService.createCourse(this.newCourseInputTitle?.value);
    this.toCourses();
  }

  toCourses() {
    this.returnToCourses.emit();
  }

} 
