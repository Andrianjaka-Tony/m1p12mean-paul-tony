import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PopoverService {
  private popoverIdSubject = new BehaviorSubject<string>('');
  popoverId$ = this.popoverIdSubject.asObservable();

  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  private rectangleSubject = new BehaviorSubject<DOMRect>(
    document.body.getBoundingClientRect()
  );
  rectangle$ = this.rectangleSubject.asObservable();

  setId(id: string) {
    this.popoverIdSubject.next(id);
  }

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  setRectangle(rectangle: DOMRect) {
    this.rectangleSubject.next(rectangle);
  }
}
