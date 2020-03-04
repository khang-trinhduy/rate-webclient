import { Component, OnInit, Input } from "@angular/core";
import { RateService } from "src/app/services/rate.service";
import { Observable } from "rxjs";
import { Banks } from "src/app/models/banks";
import { Bank } from "src/app/models/rate";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.sass"]
})
export class TableComponent implements OnInit {
  @Input() $banks: Observable<Bank[]>;
  constructor() {}

  ngOnInit() {}

  getColor(code: string) {
    if (code) {
      let bank = new Banks();
      code = code.split(" ")[0].toLowerCase();
      return bank[code];
    }
  }
}
