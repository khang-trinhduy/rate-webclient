import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.sass']
})
export class CriteriaComponent implements OnInit {

  vib = false;
  scb = false;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    let bank = this.activeRoute.snapshot.queryParams['bank'];
    if (bank.toLowerCase() == 'vib') {
      this.vib = true;
    } else {
      this.scb = true;
    }
  }

}
