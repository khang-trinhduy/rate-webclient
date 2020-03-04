import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Observable } from "rxjs";
import { Bank } from "src/app/models/rate";

@Component({
  selector: "app-interest",
  templateUrl: "./interest.component.html",
  styleUrls: ["./interest.component.sass"]
})
export class InterestComponent implements OnInit {
  $banks: Observable<Bank[]>;
  tableStyle: string = "row";
  constructor(private service: RateService) {}

  ngOnInit() {
    this.$banks = this.service.getBanks();
  }

  tableStyleHandler = event => {
    this.tableStyle = event;
  };

  showChart = event => {
    var chart = document.querySelector("app-chart");
    var row = document.querySelector("app-row");
    var line = document.querySelector("app-line");
    if (!event) {
      (<HTMLElement>chart).style.display = "none";
      if (row) {
        (<HTMLElement>row).style.width = "100%";
      }
      if (line) {
        (<HTMLElement>line).style.width = "100%";
      }
    } else {
      (<HTMLElement>chart).style.display = "block";
      if (row) {
        (<HTMLElement>row).style.width = "71.5%";
      }
      if (line) {
        (<HTMLElement>line).style.width = "71.5%";
      }
    }
  };
}
