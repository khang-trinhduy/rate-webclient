import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-sdetail",
  templateUrl: "./sdetail.component.html",
  styleUrls: ["./sdetail.component.sass"]
})
export class SdetailComponent implements OnInit {
  bank;
  main;
  others;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.bank = this.data.bank;
    this.main = this.data.main;
    this.others = this.data.others;
    this.others = this.others.sort((a, b) => {
      if (a.period != b.period) {
        return a.period - b.period;
      } else {
        let x = new Date(b.lastUpdate).getTime();
        let y = new Date(a.lastUpdate).getTime();
        return x - y;
      }
    });
    let zero = this.others.find(e => e.period === 0);
    let two = this.others.find(e => e.period === 2);
    let three = this.others.find(e => e.period === 3);
    let nine = this.others.find(e => e.period === 9);
    let twelve = this.others.find(e => e.period === 12);
    let thirteen = this.others.find(e => e.period === 13);
    let eighteen = this.others.find(e => e.period === 18);
    let tf = this.others.find(e => e.period === 24);
    let ts = this.others.find(e => e.period === 36);
    this.others = [zero, two, three, nine, twelve, thirteen, eighteen, tf, ts];
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

  max = value => {
    let rates = this.bank.interests.sort((a, b) => {
      return b.value - a.value;
    });
    let maximum = rates[0].value;
    return value === maximum;
  };
}
