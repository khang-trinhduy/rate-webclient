import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Subscription } from "rxjs";

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
  constructor(private rateService: RateService) {}
  ngOnDestroy(): void {
    this.observable.forEach(element => {
      element.unsubscribe();
    });
  }
  ngOnInit() {
    this.observable.push(
      this.rateService.getTop(1).subscribe(res => (this.best = res))
    );
    this.rateService.getTop(1);
    this.$rates = this.rateService.searchRates(this.best.value);
    this.$others = this.rateService.getRecommends(5, this.best.value);
  }
}
