import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Interest } from "src/app/models/rate";
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
  d = new Date();
  month = this.d.getMonth() + 1;
  day = this.d.getDate() < 10 ? "0" + this.d.getDate() : this.d.getDate();
  year = this.d.getFullYear();

  constructor(private service: RateService) {}

  ngOnInit() {
    this.service
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

  toDecimal = number => {
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
