import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PopoverService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  private rectangleSubject = new BehaviorSubject<DOMRect>(
    document.body.getBoundingClientRect()
  );
  rectangle$ = this.rectangleSubject.asObservable();

  open() {
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
  }

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  setRectangle(rectangle: DOMRect) {
    this.rectangleSubject.next(rectangle);
  }
}
