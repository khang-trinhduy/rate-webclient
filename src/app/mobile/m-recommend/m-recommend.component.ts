import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-m-recommend",
  templateUrl: "./m-recommend.component.html",
  styleUrls: ["./m-recommend.component.sass"]
})
export class MRecommendComponent implements OnInit {
  $rates;
  $others;
  best;
  observable: Subscription[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private rateService: RateService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.observable.forEach(element => {
      element.unsubscribe();
    });
  }
  ngOnInit() {
    let id = this.activeRoute.snapshot.queryParams["code"];
    if (id) {
      this.observable.push(
        this.rateService.getBankById(id).subscribe(
          res => (this.best = res[0]),
          error => console.log(error),
          () => {
            this.rateService.getTop(1);
            this.$rates = this.rateService.searchRates(this.best.value);
            this.$others = this.rateService.getRecommends(5, this.best.value);
          }
        )
      );
    } else {
      this.observable.push(
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
  }

  redirect = id => {
    this.router.navigateByUrl("recommend?code=" + id);
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
}
