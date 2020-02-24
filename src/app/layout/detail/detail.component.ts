import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { ActivatedRoute } from "@angular/router";
import { Rate, Information, Utility } from "src/app/models/rate";
import { Observable } from "rxjs";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.sass"]
})
export class DetailComponent implements OnInit {
  bank: Observable<Rate>;
  info$: Observable<Information>;
  utility: Observable<Utility>;
  period; 
  top = true;
  code;
  constructor(private service: RateService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.code = this.route.snapshot.queryParams["b"] || "agribank";
    let type = this.route.snapshot.queryParams["t"] || "";
    this.period =  type;
    this.bank = this.service.getBank(this.code, type);
    this.info$ = this.service.getInfo(this.code);
    this.utility = this.service.getUtility(this.code);
  }

  resolve(string) {
    switch (string) {
      case "onem":
        return "1m";

      case "threem":
        return "3m";

      case "sixm":
        return "6m";

      case "ninem":
        return "9m";

      case "twelvem":
        return "12m";

      case "eighteenm":
        return "18m";

      case "twentyfourm":
        return "24m";

      case "thirtysixm":
        return "36m";

      case "onew":
        return "1w";

      case "twow":
        return "2w";
      case "threew":
        return "3w";
      case "unlimit":
        return "unlimit";
    }
  }
}
