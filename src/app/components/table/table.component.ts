import { Component } from '@angular/core';

@Component({
  selector: '[tableComponent]',
  template: `
    <table class="w-full text-[1rem]">
      <ng-content />
    </table>
  `,
  host: {
    class: 'relative w-full overflow-auto border border-[#333] rounded-lg',
  },
})
export class TableComponent {}

@Component({
  selector: '[tableHeader]',
  template: ` <ng-content /> `,
  host: { class: '[&_tr]:border-b [&_tr]:border-[#333]' },
})
export class TableHeaderComponent {}

@Component({
  selector: '[tableBody]',
  template: ` <ng-content /> `,
  host: { class: '[&_tr:last-child]:border-0' },
})
export class TableBodyComponent {}

@Component({
  selector: '[tableFooter]',
  template: ` <ng-content /> `,
  host: { class: 'font-medium [&>tr]:last:border-b-0' },
})
export class TableFooterComponent {}

@Component({
  selector: '[tableRow]',
  template: ` <ng-content /> `,
  host: { class: 'border-b border-[#333] even:bg-[#151515] text-[#ffffff95]' },
})
export class TableRowComponent {}

@Component({
  selector: '[tableHead]',
  template: ` <ng-content /> `,
  host: {
    class:
      'px-4 py-3 text-left align-middle font-medium border-[#333] opacity-70 bg-[#050505]',
  },
})
export class TableHeadComponent {}

@Component({
  selector: '[tableCell]',
  template: ` <ng-content /> `,
  host: {
    class: 'px-4 py-3 align-middle border-[#333]',
  },
})
export class TableCellComponent {}

@Component({
  selector: '[tableCaption]',
  template: ` <ng-content /> `,
  host: { class: 'mt-4 text-sm text-muted-foreground' },
})
export class TableCaptionComponent {}
