import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Subscription } from "rxjs";
import { RateService } from "src/app/services/rate.service";
import { Logos } from "src/app/models/banks";

@Component({
  selector: "app-m-compare",
  templateUrl: "./m-compare.component.html",
  styleUrls: ["./m-compare.component.sass"]
})
export class MCompareComponent implements OnInit, AfterViewInit {
  banks;
  first: number = 0;
  second: number = 1;
  periods: any[] = [
    { value: 0, label: "Không kỳ hạn" },
    { value: 3, label: "3 tháng" },
    { value: 6, label: "6 tháng" },
    { value: 9, label: "9 tháng" },
    { value: 12, label: "12 tháng" },
    { value: 13, label: "13 tháng" },
    { value: 18, label: "18 tháng" },
    { value: 24, label: "24 tháng" },
    { value: 36, label: "36 tháng" }
  ];
  observables: Subscription[] = [];
  @ViewChild("left", { static: false }) left: ElementRef;
  @ViewChild("right", { static: false }) right: ElementRef;

  constructor(private rateService: RateService) {}
  ngAfterViewInit(): void {
    let left = this.left.nativeElement;
    let right = this.right.nativeElement;
    (<HTMLElement>left).addEventListener("click", () => {
      this.wipe("left");
      if (this.first === 0) {
        (<HTMLElement>left).style.visibility = "hidden";
      }
      (<HTMLElement>right).style.visibility = "visible";
    });
    (<HTMLElement>right).addEventListener("click", () => {
      this.wipe("right");
      if (this.second === this.periods.length - 1) {
        (<HTMLElement>right).style.visibility = "hidden";
      }
      (<HTMLElement>left).style.visibility = "visible";
    });
  }

  getPeriodLabel = idx => this.periods[idx].label;

  wipe = direction => {
    if (direction === "left") {
      this.first--;
      if (this.first < 0) {
        this.first = 0;
        this.second = 1;
      } else {
        this.second--;
      }
    } else {
      this.second++;
      if (this.second === this.periods.length) {
        this.second = this.periods.length - 1;
        this.first = this.periods.length - 2;
      } else {
        this.first++;
      }
    }
  };

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

  getRate(code, idx) {
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
    return rates.find(e => e.period === this.periods[idx].value);
  }

  change = (code, idx) => {
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
    let current = rates.find(e => e.period === this.periods[idx].value);
    for (let i = 0; i < rates.length; i++) {
      const rate = rates[i];
      if (
        rate.period === this.periods[idx].value &&
        rate.value != current.value
      ) {
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
