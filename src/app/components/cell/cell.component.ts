import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Interest } from "src/app/models/rate";
import { RateService } from "src/app/services/rate.service";
import { Subscriber, Subscription } from "rxjs";
@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.sass"]
})
export class CellComponent implements OnInit, OnDestroy {
  @Input() period;
  @Input() bank;
  sub: Subscription;

  rates: Interest[];
  d = new Date();
  month = this.d.getMonth() + 1;
  day = this.d.getDate() < 10 ? "0" + this.d.getDate() : this.d.getDate();
  year = this.d.getFullYear();

  constructor(private service: RateService) {}

  ngOnInit() {
    this.sub = this.service
      .getRate(this.bank, this.period)
      .subscribe(res => (this.rates = res));
    let canvas = this.createCanvas([
      { value: 6 },
      { value: 6.5 },
      { value: 7 }
    ]);
    let icon = document.querySelector(".up-icon");
    let holder = document.querySelector(".canvas");
    (<HTMLElement>holder).style.display = "none";
    if (icon) {
      holder.append(canvas);
      icon.addEventListener("mouseenter", event => {
        (<HTMLElement>holder).style.display = "block";
      });
    }
  }

  createCanvas(data) {
    var canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 150;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const rate = data[i];
      if (i === 0) {
        ctx.lineTo(75, rate.value * 25);
      } else {
        ctx.moveTo(75 * (i + 1), rate.value * 25);
      }
    }
    ctx.stroke();
    ctx.closePath();
    return canvas;
  }

  isMax = (val, period) => {
    this.service.getStat(period).subscribe(res => {
      if (val == res.maximum) {
        return true;
      }
      return false;
    });
  };

  isToday = date => {
    let arr = date.split("T")[0].split("-");
    if (arr[0] == this.year && arr[1] == this.month && arr[2] == this.day) {
      return true;
    }
    return false;
  };

  goUp(rates: Interest[]) {
    if (rates && rates.length >= 2) {
      return rates[0].value > rates[1].value;
    }
    return false;
  }

  goDown(rates: Interest[]) {
    if (rates && rates.length >= 2) {
      return rates[0].value < rates[1].value;
    }
    return false;
  }

  getLink(code, period = 0) {
    if (period) {
      return "/detail?b=" + code + "&t=" + period;
    } else {
      return "/detail?b=" + code;
    }
  }

  toDate = date => {
    if (date) {
      return date
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    }
  };

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2);
    } else {
      return "0.00";
    }
  };

  //TODO unsubcribe
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
