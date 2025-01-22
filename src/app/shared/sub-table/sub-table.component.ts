import { Component, ChangeDetectorRef } from "@angular/core";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { ICellRendererParams } from "ag-grid-community";
import { reviews } from "../shared.model";


@Component({
  selector: 'reviews-renderer',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf],
  template: `
    <ul *ngIf="reviews.length > 0; else noReviews">
      <!-- Loop over each review in the reviews array -->
      <li *ngFor="let review of reviews">
        <strong>{{ review.reviewerName }}</strong>:
        "{{ review.comment }}" -
        <span>{{ review.date | date:'MMM dd, yyyy' }}</span>
        [Rating: {{ review.rating }}]
      </li>
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
export class ReviewsRenderer {
    reviews: reviews[] = [];
    constructor(private cdRef: ChangeDetectorRef){}

    agInit(params: ICellRendererParams): void {
    this.reviews = params.data.reviews || [];  // This will access the reviews array from the row data
    
    this.cdRef.detectChanges();
    }

    refresh(): boolean {
        return false;  // We don't need to refresh the component every time
    }
}