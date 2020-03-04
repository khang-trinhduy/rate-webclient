import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Interest, Stat } from "src/app/models/rate";
import { RateService } from "src/app/services/rate.service";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.sass"]
})
export class CellComponent implements OnInit, OnDestroy {
  @Input() period;
  @Input() bank;

  rate: Interest;
  stats: Stat[];

  constructor(private service: RateService) {}

  ngOnInit() {
    this.service
      .getRate(this.bank, this.period)
      .subscribe(res => (this.rate = res));
  }

  isMax = (type, val) => {
    if (this.stats) {
      let temp = this.stats.find(e => e.type === type);
      if (temp) {
        if (val === temp.maximum) {
          return true;
        }
        return false;
      }
      return false;
    }
  };

  getLink(code, period = "") {
    if (period) {
      return "/detail?b=" + code + "&t=" + period;
    } else {
      return "/detail?b=" + code;
    }
  }

  getThreshold = threshold => {
    //TODO update threshold
    return "Tối thiểu 1.000.000 VNĐ";
  };

  getLoc = loc => {
    //TODO update location
    let rd = this.getRandomInt(3);
    switch (rd) {
      case 0:
        return "Cả nước";
      case 1:
        return "TP.HCM, Hà Nội";
      case 2:
        return "TP.HCM, Hà Nội, Hải Phòng, Đà Nẵng";
    }
  };
  //2020-02-01T17:00:00Z
  toDate = date => {
    if (date) {
      return date
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    }
  };

  toDecimal = (number: number) => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2);
    } else {
      return "0.00";
    }
  };

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  //TODO unsubcribe
  ngOnDestroy() {}
}
