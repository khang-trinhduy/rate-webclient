import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Interest } from "src/app/models/rate";
import { RateService } from "src/app/services/rate.service";
import { Subscriber, Subscription } from "rxjs";
@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.sass"]
})
export class CellComponent implements OnInit {
  @Input() period;
  @Input() bank;
  @Input() rate;
  @Input() change;
  sub: Subscription;
  @Input() max;

  rates: Interest[];
  d = new Date();
  month = this.d.getMonth() + 1;
  day = this.d.getDate() < 10 ? "0" + this.d.getDate() : this.d.getDate();
  year = this.d.getFullYear();

  constructor(private service: RateService) {}

  ngOnInit() {}

  getTrendingText() {
    if (this.change.value === "inc") {
      return "+" + this.toDecimal(this.change.diff) + "%";
    } else if (this.change.value === "dec") {
      return "-" + this.toDecimal(Math.abs(this.change.diff)) + "%";
    }
  }

  isMax = val => {
    return this.max == val;
  };

  isToday = date => {
    let arr = date.split("T")[0].split("-");
    if (arr[0] == this.year && arr[1] == this.month && arr[2] == this.day) {
      return true;
    }
    return false;
  };

  goUp() {
    return this.change.value === "inc";
  }

  goDown() {
    return this.change.value === "dec";
  }

  getLink(period = 0) {
    if (period) {
      return "/detail?b=" + this.bank + "&t=" + period;
    } else {
      return "/detail?b=" + this.bank;
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
}
