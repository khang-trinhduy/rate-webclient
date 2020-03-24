import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RateService } from "src/app/services/rate.service";
import { Logos } from "src/app/models/banks";

@Component({
  selector: "app-m-compare",
  templateUrl: "./m-compare.component.html",
  styleUrls: ["./m-compare.component.sass"]
})
export class MCompareComponent implements OnInit {
  banks;
  observables: Subscription[] = [];

  constructor(private rateService: RateService) {}

  ngOnInit() {
    this.observables.push(
      this.rateService.getBanks(50, 1).subscribe(res => (this.banks = res))
    );
  }

  getLogo(code: string) {
    if (code) {
      let bank = new Logos();
      code = code.split(" ")[0].toLowerCase();
      return `${bank[code]}`;
    }
  }

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2) + "%";
    } else if (number == -100) {
      return "Thỏa thuận";
    } else {
      return "0.00%";
    }
  };

  getRate(code, period) {
    let bank = this.banks.find(e => e.normalized === code);
    let rates = bank.interests.sort((a, b) => {
      if (a.period !== b.period) {
        return b.period - a.period;
      } else {
        let x = new Date(b.lastUpdate);
        let y = new Date(a.lastUpdate);

        return x.getTime() - y.getTime();
      }
    });
    return rates.find(e => e.period === period);
  }

  change = (code, period) => {
    let bank = this.banks.find(e => e.normalized === code);
    let rates = bank.interests.sort((a, b) => {
      if (a.period !== b.period) {
        return b.period - a.period;
      } else {
        let x = new Date(b.lastUpdate);
        let y = new Date(a.lastUpdate);

        return x.getTime() - y.getTime();
      }
    });
    let results = [];
    let current = rates.find(e => e.period === period);
    for (let i = 0; i < rates.length; i++) {
      const rate = rates[i];
      if (rate.period === period && rate.value != current.value) {
        results.push(rate);
      }
    }
    if (results.length <= 0) {
      return "flat";
    } else {
      if (results[0].value === 0) {
        // get rid of new rates
        return "flat";
      }
      let diff =
        parseFloat(current.value.toString()) - parseFloat(results[0].value);
      if (diff > 0) {
        return { value: "inc", diff: diff };
      } else if (diff === 0) {
        return "flat";
      } else {
        return { value: "dec", diff: diff };
      }
    }
  };
}
