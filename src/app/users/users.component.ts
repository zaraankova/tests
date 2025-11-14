import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from './services/courses.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from './model/course';
import {MatTabsModule} from '@angular/material/tabs';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-users',
  imports: [MatTabsModule, CoursesCardListComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit{
  begCources$!: Observable<Course[]>;
 
 beginnerCourses$!: Observable<Course[]>;

    advancedCourses$!: Observable<Course[]>;

   
private coursesService = inject(CoursesService)
    ngOnInit() {

      this.reloadCourses();

    }


    reloadCourses() {

      const courses$ = this.coursesService.findAllCourses();
      console.log('courses$ ',courses$ )

      this.beginnerCourses$ = this.filterByCategory(courses$, 'BEGINNER');

      this.advancedCourses$ = this.filterByCategory(courses$, 'ADVANCED');

    }

    filterByCategory(courses$: Observable<Course[]>, category:string) {
      return courses$.pipe(
        map(courses => courses.filter(course => course.category === category) )
      );
    }
}
