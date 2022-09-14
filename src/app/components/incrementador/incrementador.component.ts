import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input()
  btnClass: string = 'btn-primary';

  @Input()
  set progress(value: number) {
    if (value) {
      this.progressControl.setValue(value);
    }
  }

  @Output()
  changeProgress = new EventEmitter<number>();

  progressControl = new FormControl(50, [Validators.min(0), Validators.max(100)]);

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
    this.progressControl.valueChanges.subscribe((e) => this.onChange(e!));
  }

  onChange(event: number) {
    this.changeProgress.emit(event);
  }

  changeValue(value: number) {
    const prg = this.progressControl.value || 0;

    if (prg >= 100 && value >= 0) {
      this.progressControl.setValue(100);
      return;
    }
    if (prg <= 0 && value < 0) {
      this.progressControl.setValue(0);
      return;
    }

    this.progressControl.setValue(prg + value);
  }

  get percentage() {
    return `${this.progressControl.value}%`;
  }
}
