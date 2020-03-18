import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from "@angular/core";
import { Bank, Stat, Interest } from "src/app/models/rate";
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
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.sass"]
})
export class RowComponent implements OnInit, OnDestroy, AfterViewInit {
  banks: Bank[];
  maxs: Stat[];
  observers: Subscription[] = [];
  typeahead;
  downloadForm: FormGroup;
  @ViewChild("search", { static: false }) search: ElementRef;
  @ViewChild("holder", { static: false }) holder: ElementRef;
  @ViewChild("popup", { static: false }) popup: ElementRef;
  @ViewChildren("icon") icons: QueryList<any>;
  @ViewChildren("tag") tags: QueryList<any>;

  constructor(
    private userService: UserService,
    private service: RateService,
    private fb: FormBuilder
  ) {}
  async ngAfterViewInit() {
    let searchBox = this.search.nativeElement;

    this.typeahead = fromEvent(searchBox, "input").pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length >= 2),
      debounceTime(750),
      distinctUntilChanged(),
      switchMap(keywords => this.service.searchBanks(keywords))
    );
    this.observers.push(
      this.typeahead.subscribe(res => {
        if (res.length > 0) {
          this.banks = res;
        }
      })
    );

    // this.slideShow();
    let iHolder = this.holder.nativeElement;
    let popUpForm = this.popup.nativeElement;
    iHolder.addEventListener("click", async () => {
      let temp = this.icons.toArray();
      console.log(temp[0]._elementRef.nativeElement);

      let active = temp.find(e =>
        e._elementRef.nativeElement.classList.contains("active")
      )._elementRef.nativeElement;
      let next = active.nextElementSibling;
      active.classList.remove("active");
      active.classList.remove("animate");
      if (next) {
        next.classList.add("active");
        next.classList.add("animate");
        popUpForm.classList.remove("animate");
        popUpForm.classList.add("deactive");
        await this.wait(350);
        popUpForm.classList.remove("active");
      } else {
        let xIcon = this.icons.toArray()[0]._elementRef.nativeElement;
        xIcon.classList.add("active");
        xIcon.classList.add("animate");
        popUpForm.classList.add("animate");
        popUpForm.classList.remove("deactive");
        await this.wait(350);
        popUpForm.classList.add("active");
      }
    });
  }
  ngOnDestroy(): void {
    this.observers.forEach(obs => {
      obs.unsubscribe();
    });
  }

  rate(code, period) {
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
    for (let i = 0; i < rates.length; i++) {
      const rate = rates[i];
      if (rate.period === period) {
        results.push(rate);
      }
    }
    if (results.length <= 0) {
      console.log("error rate not found");
    } else if (results.length === 1) {
      return "flat";
    } else {
      let diff = parseFloat(results[0].value) - parseFloat(results[1].value);
      if (diff > 0) {
        return { value: "inc", diff: diff };
      } else if (diff === 0) {
        return "flat";
      } else {
        return { value: "dec", diff: diff };
      }
    }
  };

  ngOnInit() {
    this.downloadForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      phone: [""],
      require: [true]
    });
    this.observers.push(
      this.service.getBanks(50, 1).subscribe(res => (this.banks = res))
    );
    this.service.getStats().subscribe(res => (this.maxs = res));
  }

  download() {
    this.observers.push(
      this.userService
        .subscribe(this.downloadForm.value)
        .subscribe(res => console.log(res))
    );
  }

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

  max(period, code) {
    let bank = this.banks.find(e => e.normalized === code);
    let rates = bank.interests.sort((a, b) => {
      if (a.value !== b.value) {
        return b.value - a.value;
      } else {
        let x = new Date(b.lastUpdate);
        let y = new Date(a.lastUpdate);

        return x.getTime() - y.getTime();
      }
    });
    let maximum = rates[0].value;
    return rates.findIndex(e => e.value === maximum && e.period === period) >= 0;
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
