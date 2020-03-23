import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Observable, concat, of, merge, combineLatest } from "rxjs";
import { Bank } from "src/app/models/rate";
import { MatDialog } from "@angular/material/dialog";
import { SubscribeComponent } from "../subscribe/subscribe.component";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-interest",
  templateUrl: "./interest.component.html",
  styleUrls: ["./interest.component.sass"]
})
export class InterestComponent implements OnInit {
  $banks: Observable<Bank[]>;
  tableStyle: string = "row";
  pageSize = 10;
  pageIndex = 1;
  date;
  best;
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private rateService: RateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.$banks = this.rateService.getBanks(this.pageSize, this.pageIndex);
    this.rateService.getDate().subscribe(res => (this.date = res.date));
    this.best = this.rateService.getTop(1);
  }

  openDialog(bank, period): void {
    const dialogRef = this.dialog.open(SubscribeComponent, {
      width: "auto"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.bank = bank;
        result.period = period;
        this.userService.subscribe(result).subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          },
          () => {
            // show tooltip
          }
        );
      }
    });
  }

  toDate(date) {
    return date
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/");
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

  //mobile section

  recommend = () => this.router.navigateByUrl("recommend");
  service = () => this.router.navigateByUrl("service");
  compare = () => this.router.navigateByUrl("compare");
  policy = () => this.router.navigateByUrl("policy");
}
