import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AuthenticationService } from './authentication.service';
import { StoreService } from './store.service';
import { Course } from '../interfaces/course.interface';
import { User } from 'firebase/auth';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private database: FirebaseService, private storeService: StoreService) { }

  createCourse(title: string) {

    let userUID: string = '';
    let isGood: boolean = false;
    const subscription = this.storeService.userInfo$.pipe(take(1)).subscribe(val => {if (val) {isGood = true; userUID = val.uid}});
    subscription.unsubscribe();

    if (!isGood) return;

    // Добавили курс
    this.database.createCourse(title, new Date(), userUID)
    .then((response) => {
      const createdCourseUID = response.path.slice(8);
      
      // Подписали создателя на этот курс
      this.database.addUserToCourse(userUID, createdCourseUID, 'creator').then(() =>
        // Обновили список курсов для текущего юзера
        this.getCoursesListByUserUID(userUID)
      );
      
    })
    .catch((error) => {
      console.error(error.message);
    });
  }

  getCoursesListByUserUID(userUID: string) {
    this.database.getCoursesListByUserUID(userUID)
      .then(response => {
        const coursesPromisesList: any[] = [];
        response.forEach(doc => {
          const currentCourseUID = doc.data()['courseUID']; 
          coursesPromisesList.push(this.database.getCourseData(currentCourseUID));
          
        });
        
        Promise.all(coursesPromisesList)
          .then(values => {
            values = values.map(elem => elem.data());
            
            const usersPromisesList: any[] = [];
            values.forEach(elem => {
              usersPromisesList.push(this.database.getUserByUID(elem.creatorUID));
            })

            Promise.all(usersPromisesList)
              .then(users => {
                console.log(users);
                users = users.map(elem => elem.data()['lastName'] + ' ' + elem.data()['firstName']);
               

                const coursesList = [];
                for(let i = 0; i < values.length; i += 1) {
                  coursesList.push({
                    title: values[i].title,
                    creator: users[i],
                    creationDate: new Date(values[i].creationDate.seconds*1000)
                  })
                }

                coursesList.sort((a, b) => a.creationDate < b.creationDate ? 1 : -1)
                
                this.storeService.setCoursesList(coursesList);
              })

            }
          )
      }
    )
  }


}
