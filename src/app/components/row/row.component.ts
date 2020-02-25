import { Component, OnInit, Input } from "@angular/core";
import { Rate, Stat } from "src/app/models/rate";
import { RateService } from "src/app/services/rate.service";
import { Banks, Logos } from "src/app/models/banks";

@Component({
  selector: "app-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.sass"]
})
export class RowComponent implements OnInit {
  @Input() banks: Rate[];

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
    this.service.getStats().subscribe(res => (this.stats = res));
    if (this.banks) {
      for (let i = 0; i < this.banks.length; i++) {
        const bank = this.banks[i];
      }
    }
  }

  getLogo(code: string) {
    if (code) {
      let bank = new Logos();
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

  compareHandler = () => {};

  getCells = (category: string) => {};

  getMaximum = (cells: []) => {};

  addStyle = (cells: []) => {};
}
