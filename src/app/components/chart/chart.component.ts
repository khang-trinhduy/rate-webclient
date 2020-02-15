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
  @Input() rates: Rate[];
  banks: Chart[];
  constructor() {}

  ngOnInit() {
    if (this.rates) {
      let period = 12;
      for (let i = 0; i < this.rates.length; i++) {
        const bank = this.rates[i];
        let rate = bank.interestRates.find(e => e.period === period).value || 0;
        let chart = new Chart();
        chart.index = i + 1;
        chart.width = `${rate * 10}%`;
        chart.duration = (rate || 5) / 1.5;
        chart.percent = `${rate}%`;
        chart.margin - rate / 2;
        chart.code = bank.code;
        this.banks.push(chart);
      }
    }
  }

  getAnimation(code: string) {
    if (code) {
      var duration = this.banks.find(e => e.code === code).duration || 5;
      return `animation: ${duration}s ease-in 1s 1 forwards increase`;
    } else return `animation: 5s ease-in 1s 1 forwards increase`;
  }

  getBgColor(code: string) {
    let b = new Banks();
    let color = b[code];
    return color;
  }
}
