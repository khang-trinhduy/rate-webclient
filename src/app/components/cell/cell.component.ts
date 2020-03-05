import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Interest } from "src/app/models/rate";
import { RateService } from "src/app/services/rate.service";
import { Subscriber, Subscription } from "rxjs";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.sass"]
})
export class CellComponent implements OnInit, OnDestroy {
  @Input() period;
  @Input() bank;
  sub: Subscription;

  rate: Interest;
  d = new Date();
  month = this.d.getMonth() + 1;
  day = this.d.getDate() < 10 ? "0" + this.d.getDate() : this.d.getDate();
  year = this.d.getFullYear();

  constructor(private service: RateService) {}

  ngOnInit() {
    this.sub = this.service
      .getRate(this.bank, this.period)
      .subscribe(res => (this.rate = res));
  }

  isMax = (val, period) => {
    this.service.getStat(period).subscribe(res => {
      if (val == res.maximum) {
        return true;
      }
      return false;
    });
  };

  isToday = date => {
    let arr = date.split("T")[0].split("-");
    if (arr[0] == this.year && arr[1] == this.month && arr[2] == this.day) {
      return true;
    }
    return false;
  };

  getLink(code, period = 0) {
    if (period) {
      return "/detail?b=" + code + "&t=" + period;
    } else {
      return "/detail?b=" + code;
    }
  }

  toDate = date => {
    if (date) {
      return date
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    }
  };

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2);
    } else {
      return "0.00";
    }
  };

  //TODO unsubcribe
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
