import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { SubscribeComponent } from '../subscribe/subscribe.component';

@Component({
  selector: "app-highest",
  templateUrl: "./highest.component.html",
  styleUrls: ["./highest.component.sass"]
})
export class HighestComponent implements OnInit {
  $rates;
  constructor(
    private service: RateService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.$rates = this.service.searchRates(
      this.activeRoute.snapshot.queryParams["value"]
    );
  }

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2);
    } else {
      return "0.00";
    }
  };

  subscribe(bank) {
    const dialog = this.dialogRef.open(SubscribeComponent, {
      width: "auto"
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        result.bank = bank;
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
}
