import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Bank, Utility, Card, Interest } from "src/app/models/rate";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.sass"]
})
export class ContentComponent implements OnInit {
  @Input() rate: Interest;
  @Input() utility: Observable<Utility>;

  open: boolean = true;

  onlineRate = {
    period: 12,
    rate: 5.3,
    periodType: "Tháng",
    type: "online",
    source: "admin",
    updated: "20/02/2020"
  };
  offlineRate = {
    period: 12,
    rate: 5.7,
    periodType: "Tháng",
    type: "offline",
    source: "admin",
    updated: "20/02/2020"
  };

  constructor() {}

  ngOnInit() {}

  hideSetting() {
    var search = document.querySelector(".search-container");
    var setting = document.querySelector(".setting-text");
    if (search) {
      if (this.open) {
        (<HTMLElement>search).style.animation =
          "pullup 0.35s linear 0s forwards 1 normal";
        if (setting) {
          (<HTMLElement>setting).textContent = "Show setting";
        }
      } else {
        (<HTMLElement>search).style.animation =
          "pulldown 0.35s linear 0s forwards 1 normal";
        if (setting) {
          (<HTMLElement>setting).textContent = "Hide setting";
        }
      }
      this.open = !!!this.open;
    }
  }
}
