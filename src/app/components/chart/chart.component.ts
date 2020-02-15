import { Component, OnInit, Input } from "@angular/core";
import { Rate } from "src/app/models/rate";
import { Chart } from "src/app/models/chart";
import { Banks } from "src/app/models/banks";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.sass"]
})
export class ChartComponent implements OnInit {
  @Input() rates;
  banks: Chart[];
  constructor() {}

  ngOnInit() {
    if (this.rates) {
      let period = 12;
      for (let i = 0; i < this.rates.length; i++) {
        const bank = this.rates[i];
        let rate = bank.interestRates.find(e => e.period === period).value || 0;
        // let chart = new Chart();
        bank.index = i + 1;
        bank.width = `${rate * 10}%`;
        bank.duration = (rate || 5) / 1.65;
        bank.percent = `${rate}%`;
        bank.margin - rate / 2;
        bank.code = bank.code;
        // this.banks.push(chart);
      }
    }
  }

  getAnimation(code: string) {
    if (code) {
      var duration = this.rates.find(e => e.code === code).duration || 5;
      return `${duration}s ease-in 0s 1 forwards increase`;
    } else return `5s ease-in 0s 1 forwards increase`;
  }

  display(code: string) {
    if (code) {
      var duration = this.rates.find(e => e.code === code).duration || 5;
      return `${duration}s ease-in 0s 1 forwards appear`;
    } else return `5s ease-in 5s 1 forwards normal appear`;
  }

  getBgColor(code: string) {
    code = code.split(' ')[0].toLowerCase();
    let b = new Banks();
    let color = b[code];
    return color;
  }

  getWidth(code: string) {
    if (code) {
      var width = this.rates.find(e => e.code === code).width || "50%";
      return width;
    } else {
      return "50%";
    }
  }
}
