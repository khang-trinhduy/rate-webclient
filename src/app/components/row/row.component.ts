import { Component, OnInit, Input } from "@angular/core";
import { Bank, Stat } from "src/app/models/rate";
import { RateService } from "src/app/services/rate.service";
import { Banks, Logos } from "src/app/models/banks";
import { Observable, merge, combineLatest } from "rxjs";

@Component({
  selector: "app-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.sass"]
})
export class RowComponent implements OnInit {
  $banks: Observable<Bank[]>;

  pageSize = 10;
  pageIndex = 1;
  stats: Stat[];

  constructor(private service: RateService) {}

  periods = [
    "0w",
    "1w",
    "2w",
    "3w",
    "1m",
    "18m",
    "3m",
    "6m",
    "9m",
    "12m",
    "24m",
    "36m"
  ];

  ngOnInit() {
    this.$banks = this.service.getBanks(this.pageSize, this.pageIndex);
    this.service.getStats().subscribe(res => (this.stats = res));
  }

  onScrollDown() {
    console.log("scrolled");

    this.pageIndex = this.pageIndex + 1;
    let news = this.service.getBanks(this.pageSize, this.pageIndex);
    this.$banks = combineLatest(this.$banks, news);
  }

  getLogo(code: string) {
    if (code) {
      let bank = new Logos();
      code = code.split(" ")[0].toLowerCase();
      return `${bank[code]}`;
    }
  }

  toDecimal = (number: number) => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2);
    } else {
      return "0.00";
    }
  };

  getColor(code: string) {
    if (code) {
      let bank = new Banks();
      code = code.split(" ")[0].toLowerCase();
      return bank[code];
    }
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

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  compareHandler = () => {};

  getCells = (category: string) => {};

  getMaximum = (cells: []) => {};

  addStyle = (cells: []) => {};
}
