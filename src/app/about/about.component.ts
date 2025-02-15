import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, delay, interval, of } from 'rxjs';

export interface Errors{
  message: string[],
  code: number
}
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  ngOnInit(){
    // const obs1 = interval(1000);
    // const obs2 = interval(2000);

    // combineLatest([obs1, obs2]).subscribe(result => {
    //   console.log(result)
    // })
  }
  

}