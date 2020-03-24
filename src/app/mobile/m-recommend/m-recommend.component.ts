import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MDetailComponent } from "../m-detail/m-detail.component";

@Component({
  selector: "app-m-recommend",
  templateUrl: "./m-recommend.component.html",
  styleUrls: ["./m-recommend.component.sass"]
})
export class MRecommendComponent implements OnInit {
  $rates;
  $others;
  best;
  observables: Subscription[] = [];
  constructor(
    private rateService: RateService,
    private dialogRef: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.observables.forEach(element => {
      element.unsubscribe();
    });
  }
  ngOnInit() {
    this.observables.push(
      this.rateService.getTop(1).subscribe(
        res => (this.best = res[0]),
        error => console.log(error),
        () => {
          this.rateService.getTop(1);
          this.$rates = this.rateService.searchRates(this.best.value);
          this.$others = this.rateService.getRecommends(5, this.best.value);
        }
      )
    );
  }

  redirect = id => {
    this.observables.push(
      this.rateService.getRateById(id).subscribe(
        res => (this.best = res),
        error => console.log(error),
        () => {
          this.rateService.getTop(1);
          this.$rates = this.rateService.searchRates(this.best.value);
          this.$others = this.rateService.getRecommends(5, this.best.value);
        }
      )
    );
  };

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2) + "%";
    } else if (number == -100) {
      return "Thỏa thuận";
    } else {
      return "0.00%";
    }
  };

  max = () => {
    return this.best.value;
  };

  detail = bank => {
    this.observables.push(
      this.rateService.getBank(bank).subscribe(res => {
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
        this.dialogRef.open(MDetailComponent, {
          width: "auto",
          height: "80vh",
          data: {
            bank: res,
            main: main,
            others: others
          }
        });
      })
    );
  };
}
