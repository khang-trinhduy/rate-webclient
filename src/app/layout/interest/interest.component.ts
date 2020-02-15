import { Component, OnInit } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Observable } from "rxjs";
import { Rate } from "src/app/models/rate";

@Component({
  selector: "app-interest",
  templateUrl: "./interest.component.html",
  styleUrls: ["./interest.component.sass"]
})
export class InterestComponent implements OnInit {
  rates: Rate[];
  constructor(private service: RateService) {}

  ngOnInit() {
    this.service.getRates().subscribe(res => (this.rates = res));
  }

  
}
