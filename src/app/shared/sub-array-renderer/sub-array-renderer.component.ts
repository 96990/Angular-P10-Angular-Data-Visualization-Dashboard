import { Component, ChangeDetectorRef } from "@angular/core";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { ICellRendererParams } from "ag-grid-community";
import { reviews } from "../shared.model";

export interface ICustomCellRendererParams extends ICellRendererParams{
  columnKeys: string[]
}

@Component({
  selector: 'subarray-renderer',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf],
  template: `
    <ul *ngIf="reviews.length > 0 && columnKeys.length > 0; else noReviews">
      <!-- Loop over each review in the reviews array -->
      <li *ngFor="let review of reviews">
        <strong>Rating: {{ review[columnKeys[0]] }} -
        {{ review[columnKeys[1]] }}</strong>:
        "{{ review[columnKeys[2]] }}" -
        <span>{{ review[columnKeys[3]] | date:'MMM dd, yyyy' }}</span>
      </li>
    </ul>
      <!-- if there is not columnkey then it should be an array.-->
    <ul *ngIf="reviews.length > 0 && columnKeys.length < 0; else noReviews">
      <li *ngFor="let review of reviews">
          {{review}}
    </ul>
    
    <ng-template #noReviews>No Reviews Available</ng-template>
  `,
  styles: [
    `ul {
        padding-left: 16px;
        margin: 0;
        font-size: 12px;
    }
    li {
        margin-bottom: 4px;
    }`
  ]
})
export class SubarrayRenderer {
    reviews: reviews[] = [];
    columnKeys!: string[];
    constructor(private cdRef: ChangeDetectorRef){}

    agInit(params: ICustomCellRendererParams): void {
      this.reviews = params.data.reviews || [];  // This will access the reviews array from the row data
      this.columnKeys = params.columnKeys || [];  
      this.cdRef.detectChanges();
    }
}