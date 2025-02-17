import {Component} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";

const SAMPLE_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum sit amet metus id scelerisque. Mauris nibh felis, porta a cursus a, commodo sed lectus. Ut nibh libero, dictum non ultricies ut, varius ac leo. Mauris bibendum elit non justo volutpat finibus. Sed vel purus mattis, elementum libero et, suscipit purus. Maecenas cursus feugiat purus, vel tristique tortor tempor id. Quisque accumsan ornare porttitor. Praesent dapibus nisi ut lobortis tincidunt. Donec aliquet lobortis turpis, non fringilla dui molestie vel. In maximus, purus non dictum venenatis, mauris dui eleifend mi, a dictum lectus augue sed nunc. Quisque facilisis euismod ligula, vel ultricies quam fermentum vel. Fusce finibus metus quis venenatis convallis. Aenean eu varius felis. Cras suscipit rhoncus felis, eu egestas lacus. Aenean laoreet vehicula purus.'

@Component({
    selector: "create-course-step-1",
    templateUrl: "create-course-step-1.component.html",
    styleUrls: ["create-course-step-1.component.scss"],
    standalone: false
})
export class CreateCourseStep1Component {

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    releasedAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [SAMPLE_TEXT, [Validators.required, Validators.minLength(3)]]
  });

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate()
    if (view === 'month' && date === 1) {
      return 'highlight-date'
    }
    return ''
  }

  constructor(private fb: UntypedFormBuilder) {

  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
