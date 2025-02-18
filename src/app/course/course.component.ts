import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize} from 'rxjs/operators';
import {merge, fromEvent, throwError} from "rxjs";
import {Lesson} from "../model/lesson";


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  standalone: false
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  lessons: Lesson[] = [];
  isLoading = false;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  displayedColumns: string[] = ['seqNo', 'description', 'duration'];

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService) {

  }

  ngOnInit() {

    this.course = this.route.snapshot.data["course"];

    this.loadLessonsPage();
  }

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe()
  }

  private loadLessonsPage() {
    this.isLoading = true;
    this.coursesService.findLessons(
      this.course.id,
      'asc',
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 3)
      .pipe(
        tap(lessons => this.lessons = lessons),
        catchError(error => {
          console.log("Error loading lessons:", error);
          alert("Error loading lessons");
          return throwError(error);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(lessons => this.lessons = lessons);
  }
}
