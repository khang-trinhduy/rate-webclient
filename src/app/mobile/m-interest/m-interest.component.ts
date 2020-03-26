import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-m-interest',
  templateUrl: './m-interest.component.html',
  styleUrls: ['./m-interest.component.sass']
})
export class MInterestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  recommend = () => this.router.navigateByUrl("recommend");
  service = () => this.router.navigateByUrl("service");
  compare = () => this.router.navigateByUrl("compare");
  policy = () => this.router.navigateByUrl("policy");

}
