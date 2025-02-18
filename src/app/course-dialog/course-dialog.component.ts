import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Course} from "../model/course";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    standalone: false
})
export class CourseDialogComponent implements OnInit {

    description: string;

    form = this.fb.group({
      description: [this.course.description, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      category: [this.course.category, Validators.required],
      releasedAt: [new Date(), Validators.required],
      longDescription: [this.course.longDescription, [Validators.required, Validators.minLength(3)]]
    })

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<CourseDialogComponent>,
                @Inject(MAT_DIALOG_DATA) private course: Course) {

        this.description = course.description;

    }

    ngOnInit() {

    }

    close() {
      this.dialogRef.close();
    }

    save() {
      this.dialogRef.close(this.form.value);
    }

}

export function openEditCourseDialog(dialog: MatDialog, course: Course) {

  const dialogRef = dialog.open(CourseDialogComponent, {
        data: { ...course },
        disableClose: true,
        autoFocus: true,
        panelClass: 'modal-panel',
        backdropClass: 'backdrop-modal-panel',
    });

  return dialogRef.afterClosed();
}

