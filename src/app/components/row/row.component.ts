import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Bank, Stat } from "src/app/models/rate";
import { RateService } from "src/app/services/rate.service";
import { Banks, Logos } from "src/app/models/banks";
import {
  Observable,
  merge,
  combineLatest,
  fromEvent,
  Subscription
} from "rxjs";
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";

@Component({
  selector: "app-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.sass"]
})
export class RowComponent implements OnInit, OnDestroy {
  banks: Bank[];
  maxs: Stat[];
  observer: Subscription;
  typeahead;
  typeObserver: Subscription;

  constructor(private service: RateService) {}
  ngOnDestroy(): void {
    this.observer.unsubscribe();
    this.typeObserver.unsubscribe();
  }

  ngOnInit() {
    this.observer = this.service
      .getBanks(50, 1)
      .subscribe(res => (this.banks = res));
    this.service.getStats().subscribe(res => (this.maxs = res));

    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        let searchBox = document.querySelector(".kjdFF");

        this.typeahead = fromEvent(searchBox, "input").pipe(
          map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
          filter(text => text.length >= 2),
          debounceTime(750),
          distinctUntilChanged(),
          switchMap(keywords => this.service.searchBanks(keywords))
        );
        this.typeObserver = this.typeahead.subscribe(res => {
          if (res.length > 0) {
            this.banks = res;
          }
        });
        this.slideShow();
      }
    };
  }

  slideShow = async () => {
    let tag = document.querySelector(".ErmGg a.active");
    tag.classList.remove("active");
    let next = tag.nextElementSibling;
    if (next) {
      next.classList.add("active");
    } else {
      let firstTag = document.querySelector(".ErmGg a");
      firstTag.classList.add("active");
    }
    await this.wait(3000);
    this.slideShow();
  };

  wait = async ms => {
    return new Promise(r => setTimeout(r, ms));
  };

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

  max(period) {
    return this.maxs.find(e => e.period == period.toString()).maximum;
  }

  getColor(code: string) {
    if (code) {
      let bank = new Banks();
      code = code.split(" ")[0].toLowerCase();
      return bank[code];
    }
  }

  getLink(code, period = "") {
    if (period) {
      return "/detail?b=" + code + "&t=" + period;
    } else {
      return "/detail?b=" + code;
    }
  }

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  compareHandler = () => {};

  getCells = (category: string) => {};

  getMaximum = (cells: []) => {};

  addStyle = (cells: []) => {};
}
