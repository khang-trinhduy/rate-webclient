import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Subscription, fromEvent } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MDetailComponent } from "../m-detail/m-detail.component";
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";

@Component({
  selector: "app-m-recommend",
  templateUrl: "./m-recommend.component.html",
  styleUrls: ["./m-recommend.component.sass"]
})
export class MRecommendComponent implements OnInit {
  $rates;
  $others;
  searchResults;
  best;
  typeahead;
  observables: Subscription[] = [];

  @ViewChild("searchBar", { static: false }) searchBar: ElementRef;
  @ViewChild("search", { static: false }) search: ElementRef;
  @ViewChild("main", { static: false }) main: ElementRef;
  @ViewChild("loader", { static: false }) loader: ElementRef;

  constructor(private rateService: RateService, private dialogRef: MatDialog) {}

  ngOnDestroy(): void {
    this.observables.forEach(element => {
      element.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    let searchBar = this.searchBar.nativeElement;
    let search = this.search.nativeElement;
    let main = this.main.nativeElement;

    this.typeahead = fromEvent(searchBar, "input").pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length >= 2),
      debounceTime(750),
      distinctUntilChanged(),
      switchMap(keywords => this.rateService.searchBanks(keywords))
    );
    this.observables.push(
      this.typeahead.subscribe(res => {
        if (res.length > 0) {
          this.searchResults = res;
        }
      })
    );

    let scrollUp = false;
    document.addEventListener("scroll", () => {
      scrollUp = true;
    });
    document.addEventListener("wheel", evt => {
      let body = document.querySelector("body");
      let bounding = (<HTMLBodyElement>body).getBoundingClientRect();
      if (!scrollUp && bounding.top === 0) {
        (<HTMLElement>search).classList.remove("mieee");
        (<HTMLElement>search).classList.add("mmkii");
        (<HTMLElement>main).classList.add("kkjjy");
      } else {
        (<HTMLElement>search).classList.remove("mmkii");
        (<HTMLElement>main).classList.remove("kkjjy");
        (<HTMLElement>search).classList.add("mieee");
      }
      scrollUp = false;
    });
    let loader = this.loader.nativeElement;
    (<HTMLElement>loader).classList.add("mkdih");
  }

  ngOnInit() {
    this.observables.push(
      this.rateService.getTop(1).subscribe(
        res => (this.best = res[0]),
        error => console.log(error),
        () => {
          this.rateService.getTop(1);
          this.$rates = this.rateService.searchRates(this.best.value);
          this.$others = this.rateService.getRecommends(5, this.best.value);
        }
      )
    );
  }

  redirect = id => {
    this.observables.push(
      this.rateService.getRateById(id).subscribe(
        res => (this.best = res),
        error => console.log(error),
        () => {
          this.rateService.getTop(1);
          this.$rates = this.rateService.searchRates(this.best.value);
          this.$others = this.rateService.getRecommends(5, this.best.value);
        }
      )
    );
  };

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2) + "%";
    } else if (number == -100) {
      return "Thỏa thuận";
    } else {
      return "0.00%";
    }
  };

  max = () => {
    return this.best.value;
  };

  detail = bank => {
    this.observables.push(
      this.rateService.getBank(bank).subscribe(res => {
        let interests = res.interests.sort((a, b) => {
          if (a.period != b.period) {
            return a.period - b.period;
          } else {
            let x = new Date(b.lastUpdate).getTime();
            let y = new Date(a.lastUpdate).getTime();
            return x - y;
          }
        });
        let one = interests.find(e => e.period === 1);
        let six = interests.find(e => e.period === 6);
        let oIndex = interests.indexOf(one);
        let sIndex = interests.indexOf(six);
        interests.slice(oIndex, 1);
        interests.slice(sIndex, 1);
        let main = [one, six];
        let others = interests;
        this.dialogRef.open(MDetailComponent, {
          width: "auto",
          height: "80vh",
          data: {
            bank: res,
            main: main,
            others: others
          }
        });
      })
    );
  };
}
