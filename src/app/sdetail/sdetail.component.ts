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
  }

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2);
    } else {
      return "0.00";
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
