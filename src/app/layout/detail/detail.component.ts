import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { ActivatedRoute } from "@angular/router";
import { Bank, Information, Utility, Interest } from "src/app/models/rate";
import { Observable } from "rxjs";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.sass"]
})
export class DetailComponent implements OnInit {
  bank: Bank;
  rate: Interest;
  period;
  top = true;
  code;
  reviews;
  summary;
  bankid;
  constructor(private service: RateService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.code = this.route.snapshot.queryParams["b"]
      ? this.route.snapshot.queryParams["b"]
      : this.route.snapshot.queryParams["c"];
    let type = this.route.snapshot.queryParams["t"] || "";
    this.period = type;
    this.service
      .getBankById(this.code, type)
      .subscribe(res => (this.bank = res));
  }
}
