import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Rate, Utility, Card } from "src/app/models/rate";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.sass"]
})
export class ContentComponent implements OnInit {
  @Input() rate: Observable<Rate>;
  @Input() utility: Observable<Utility>;

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
}
