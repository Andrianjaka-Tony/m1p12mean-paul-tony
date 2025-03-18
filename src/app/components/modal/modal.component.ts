import { Component, OnInit, output } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  readonly close = output();

  ngOnInit(): void {
    this.animateIn();
  }

  animateIn() {
    gsap.fromTo(
      '.modal-overlay, .modal-content',
      { opacity: 0 },
      { opacity: 1, duration: 0.1, ease: 'power1.inOut' }
    );
  }

  handleClose() {
    gsap.fromTo(
      '.modal-overlay, .modal-content',
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.1,
        ease: 'power1.inOut',
        onComplete: () => {
          this.close.emit();
        },
      }
    );
  }
}
