import { Component, OnInit, OnDestroy } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { SubscribeComponent } from "../../../layout/subscribe/subscribe.component";
import { Subscription } from "rxjs";
import { SdetailComponent } from "src/app/modules/interest/sdetail/sdetail.component";

@Component({
  selector: "app-highest",
  templateUrl: "./highest.component.html",
  styleUrls: ["./highest.component.sass"]
})
export class HighestComponent implements OnInit, OnDestroy {
  $rates;
  observables: Subscription[] = [];
  constructor(
    private service: RateService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private dialogRef: MatDialog
  ) {}

  ngOnDestroy() {
    this.observables.forEach(obs => {
      obs.unsubscribe();
    });
  }

  ngOnInit() {
    this.$rates = this.service.searchRates(
      this.activeRoute.snapshot.queryParams["value"]
    );
  }

  showBank(bank) {
    this.observables.push(
      this.service.getBank(bank).subscribe(res => {
        let interests = res.interests.sort((a, b) => {
          if (a.period != b.period) {
            return a.period - b.period;
          } else {
            let x = new Date(b.lastUpdate).getTime();
            let y = new Date(a.lastUpdate).getTime();
            return x - y;
          }
        });
        let one = interests.find(e => e.period === 1);
        let six = interests.find(e => e.period === 6);
        let oIndex = interests.indexOf(one);
        let sIndex = interests.indexOf(six);
        interests.slice(oIndex, 1);
        interests.slice(sIndex, 1);
        let main = [one, six];
        let others = interests;
        this.dialogRef.open(SdetailComponent, {
          width: "auto",
          height: "100%",
          data: {
            bank: res,
            main: main,
            others: others
          }
        });
      })
    );
  }

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2) + "%";
    } else if (number == -100) {
      return "Thỏa thuận";
    } else {
      return "không hỗ trợ";
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
