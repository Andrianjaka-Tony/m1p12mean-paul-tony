import { Component } from '@angular/core';

@Component({
  selector: 'table-component',
  template: `
    <div className="relative w-full overflow-auto">
      <table class="w-full caption-bottom text-sm">
        <ng-content />
      </table>
    </div>
  `,
})
export class TableComponent {}

@Component({
  selector: 'table-header-component',
  template: `
    <thead class="[&_tr]:border-b">
      <ng-content />
    </thead>
  `,
})
export class TableHeaderComponent {}

@Component({
  selector: 'table-body-component',
  template: `
    <tbody class="[&_tr:last-child]:border-0">
      <ng-content />
    </tbody>
  `,
})
export class TableBodyComponent {}

@Component({
  selector: 'table-footer-component',
  template: `
    <tfoot class="border-t bg-muted/50 font-medium [&>tr]:last:border-b-0">
      <ng-content />
    </tfoot>
  `,
})
export class TableFooterComponent {}

@Component({
  selector: 'table-row-component',
  template: `
    <tr class="border-b">
      <ng-content />
    </tr>
  `,
})
export class TableRowComponent {}

@Component({
  selector: 'table-head-component',
  template: `
    <th
      class="h-12 px-4 text-left align-middle font-medium &:has([role=checkbox])]:pr-0"
    >
      <ng-content />
    </th>
  `,
})
export class TableHeadComponent {}

@Component({
  selector: 'table-cell-component',
  template: `
    <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <ng-content />
    </td>
  `,
})
export class TableCellComponent {}

@Component({
  selector: 'table-caption-component',
  template: `
    <caption class="mt-4 text-sm text-muted-foreground">
      <ng-content />
    </caption>
  `,
})
export class TableCaptionComponent {}
