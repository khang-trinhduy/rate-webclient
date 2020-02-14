import { Component, OnInit, Input } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Observable } from "rxjs";
import { Rate } from "src/app/models/rate";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.sass"]
})
export class TableComponent implements OnInit {
  @Input() rates: Rate[];
  constructor() {}

  ngOnInit() {}

  getColor(code) {
    return "antiquewhite";
  }
}
