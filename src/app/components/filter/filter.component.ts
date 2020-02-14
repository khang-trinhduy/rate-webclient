import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener("load", () => {
      let left = document.querySelector('.left-range')
      let right = document.querySelector('.right-range')
      if (left && right) {
        
      }
    })
  }

}
