import { Component, OnInit, OnDestroy } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { ActivatedRoute } from "@angular/router";
import { Bank, Information, Utility, Interest } from "src/app/models/rate";
import { Observable, of } from "rxjs";
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
  rate: Interest;
  period;
  top = true;
  code;
  reviews;
  summary;
  bankid;
  others: Interest[];
  main: Interest[];
  toBeDestroyed;
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
    this.code = this.route.snapshot.queryParams["b"]
      ? this.route.snapshot.queryParams["b"]
      : this.route.snapshot.queryParams["c"];
    let type = this.route.snapshot.queryParams["t"] || "";
    this.period = type;
    this.toBeDestroyed = this.service.getBankById(this.code, type).subscribe(
      res => (this.bank = res),
      error => {},
      () => {
        console.log(this.bank);

        if (this.bank) {
          let interests = this.bank.interests.sort((a, b) => {
            if (a.period != b.period) {
              return a.period - b.period;
            } else {
              let x = new Date(b.lastUpdate).getTime();
              let y = new Date(a.lastUpdate).getTime();
              return x - y;
            }
          });
          let zero = interests.find(e => e.period === 0);
          let two = interests.find(e => e.period === 2);
          let three = interests.find(e => e.period === 3);
          let nine = interests.find(e => e.period === 9);
          let twelve = interests.find(e => e.period === 12);
          let thirteen = interests.find(e => e.period === 13);
          let eighteen = interests.find(e => e.period === 18);
          let tf = interests.find(e => e.period === 24);
          let ts = interests.find(e => e.period === 36);
          this.others = [
            zero,
            two,
            three,
            nine,
            twelve,
            thirteen,
            eighteen,
            tf,
            ts
          ];
          let one = interests.find(e => e.period === 1);
          let six = interests.find(e => e.period === 6);
          this.main = [one, six];
        }
      }
    );
    window.addEventListener("load", () => {
      let elems = document.querySelectorAll(".mnOpd");
      for (let i = 0; i < elems.length; i++) {
        const element = elems[i];
        element.addEventListener("mouseenter", () => {
          let show = element.querySelector("a");
          (<HTMLElement>show).style.right = "5px";
          (<HTMLElement>show).style.opacity = "1";
        });
        element.addEventListener("mouseleave", () => {
          let show = element.querySelector("a");
          (<HTMLElement>show).style.right = "-97.5px";
          (<HTMLElement>show).style.opacity = "0";
        });
      }
    });
  }

  max = value => {
    let maximum;
    of(this.main, this.others).subscribe(res => {
      maximum = res.sort((a, b) => {
        return b.value - a.value;
      });
    });
    return value === maximum[0].value;
  };

  subscribe(bank) {
    const dialog = this.dialogRef.open(SubscribeComponent, {
      width: "auto"
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        result.bank = bank;
        this.userService.subscribe(result).subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          },
          () => {
            // show tooltip
          }
        );
      }
    });
  }

  toDecimal = number => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2) + "%";
    } else if (number == -100) {
      return "Thỏa thuận";
    } else {
      return "không hỗ trợ";
    }
  };
}
