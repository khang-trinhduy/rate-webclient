import { Component, OnInit, Input } from "@angular/core";
import { Bank } from "src/app/models/rate";
import { Chart } from "src/app/models/chart";
import { Banks } from "src/app/models/banks";
import { RateService } from "src/app/services/rate.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.sass"]
})
export class ChartComponent implements OnInit {
  @Input() $banks;
  @Input() period = "12m";
  @Input() top;
  @Input() bank;
  banks: Chart[];
  constructor(private service: RateService) {}

  ngOnInit() {
    // if (this.top && this.period) {
    //   this.service.getTop(this.period).subscribe(
    //     res => (this.rates = res),
    //     error => {},
    //     () => {
    //       for (let i = 0; i < this.rates.length; i++) {
    //         const bank = this.rates[i];
    //         let rate = this.getRate(bank, this.period) | 0;
    //         // let chart = new Chart();
    //         bank.index = i + 1;
    //         bank.width = `${rate * 10}%`;
    //         bank.duration = (rate || 5) / 1.65;
    //         bank.percent = `${rate}%`;
    //         bank.margin - rate / 2;
    //         bank.code = bank.code;
    //         // this.banks.push(chart);
    //       }
    //     }
    //   );
    // } else {
    //   if (this.rates) {
    //     for (let i = 0; i < this.rates.length; i++) {
    //       const bank = this.rates[i];
    //       let rate = this.getRate(bank, this.period) | 0;
    //       // let chart = new Chart();
    //       bank.index = i + 1;
    //       bank.width = `${rate * 10}%`;
    //       bank.duration = (rate || 5) / 1.65;
    //       bank.percent = `${rate}%`;
    //       bank.margin - rate / 2;
    //       bank.code = bank.code;
    //       // this.banks.push(chart);
    //     }
    //   }
    // }
  }

  getPeriod() {
    switch (this.period) {
      case "unlimit":
        return "không thời hạn";
      case "1w":
        return "1 tuần";
      case "2w":
        return "2 tuần";
      case "3w":
        return "3 tuần";
      case "1m":
        return "1 tháng";
      case "3m":
        return "3 tháng";
      case "6m":
        return "6 tháng";
      case "9m":
        return "9 tháng";
      case "12m":
        return "12 tháng";
      case "18m":
        return "18 tháng";
      case "24m":
        return "24 tháng";
      case "36m":
        return "36 tháng";
      default:
        return "không thời hạn";
    }
  }

  getRate(bank, period) {
    switch (period) {
      case "unlimit":
        return bank.interestRates.unlimit.value;
      case "1w":
        return bank.interestRates.oneW.value;
      case "2w":
        return bank.interestRates.twoW.value;
      case "3w":
        return bank.interestRates.threeW.value;
      case "1m":
        return bank.interestRates.oneM.value;
      case "3m":
        return bank.interestRates.threeM.value;
      case "6m":
        return bank.interestRates.sixM.value;
      case "9m":
        return bank.interestRates.nineM.value;
      case "12m":
        return bank.interestRates.twelveM.value;
      case "18m":
        return bank.interestRates.eighteenM.value;
      case "24m":
        return bank.interestRates.twentyFourM.value;
      case "36m":
        return bank.interestRates.thirtySixM.value;
      default:
        return 0.5;
    }
  }

  // getAnimation(code: string) {
  //   if (code) {
  //     var duration = this.rates.find(e => e.code === code).duration || 5;
  //     return `${duration}s ease-in 0s 1 forwards increase`;
  //   } else return `5s ease-in 0s 1 forwards increase`;
  // }

  // display(code: string) {
  //   if (code) {
  //     var duration = this.rates.find(e => e.code === code).duration || 5;
  //     return `${duration}s ease-in 0s 1 forwards appear`;
  //   } else return `5s ease-in 5s 1 forwards normal appear`;
  // }

  // getBgColor(code: string) {
  //   code = code.split(" ")[0].toLowerCase();
  //   let b = new Banks();
  //   let color = b[code];
  //   return color;
  // }

  // getWidth(code: string) {
  //   if (code) {
  //     var width = this.rates.find(e => e.code === code).width || "50%";
  //     return width;
  //   } else {
  //     return "50%";
  //   }
  // }
}
