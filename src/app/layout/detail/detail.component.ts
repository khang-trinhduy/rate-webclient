import { Component, OnInit, OnDestroy } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { ActivatedRoute } from "@angular/router";
import { Bank, Information, Utility, Interest } from "src/app/models/rate";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { SubscribeComponent } from "../subscribe/subscribe.component";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.sass"]
})
export class DetailComponent implements OnInit, OnDestroy {
  bank: Bank;
  others: Interest[];
  main: Interest[];
  toBeDestroyed;
  code
  constructor(
    private userService: UserService,
    private dialogRef: MatDialog,
    private service: RateService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.toBeDestroyed.unsubscribe();
  }

  ngOnInit() {
    this.toBeDestroyed = this.service.getBankById(this.code).subscribe(
      res => (this.bank = res),
      error => {},
      () => {
        console.log(this.bank);

        if (this.bank) {
          let interests = this.bank.interests.sort((a, b) => {
            return a.period - b.period;
          });
          let one = interests.find(e => e.period === 1);
          let six = interests.find(e => e.period === 6);
          let oIndex = interests.indexOf(one);
          let sIndex = interests.indexOf(six);
          interests.slice(oIndex, 1);
          interests.slice(sIndex, 1);
          this.main = [one, six];
          this.others = interests;
        }
      }
    );
  }

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2);
    } else {
      return "0.00";
    }
  };
}
