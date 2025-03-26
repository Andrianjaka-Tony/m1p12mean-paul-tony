import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Grid, List, LucideAngularModule, Search } from 'lucide-angular';
import { ButtonComponent } from 'src/app/components/button/button.component';

@Component({
  selector: 'car-page',
  imports: [LucideAngularModule, ButtonComponent, RouterLink],
  templateUrl: './car-page.component.html',
  styles: ``,
})
export class CarPage implements OnInit {
  readonly search = Search;
  readonly grid = Grid;
  readonly list = List;

  readonly route = inject(ActivatedRoute);
  id: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        this.id = id;
      }
    });
  }
}
