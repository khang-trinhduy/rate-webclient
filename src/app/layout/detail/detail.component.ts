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
  bank: Rate;
  info$: Observable<Information>;
  utility: Observable<Utility>;
  period;
  top = true;
  code;
  reviews;
  summary;
  constructor(private service: RateService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.code = this.route.snapshot.queryParams["b"] || "agribank";
    let type = this.route.snapshot.queryParams["t"] || "";
    this.period = type;
    this.service.getBank(this.code, type).subscribe(
      res => (this.bank = res),
      error => console.log(error),
      () => {
        this.reviews = this.service.getReview(this.bank._id);
        this.summary = this.service.getReviewSummary(this.bank._id);
      }
    );
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
