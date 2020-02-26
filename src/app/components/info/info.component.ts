import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Information } from 'src/app/models/rate';

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.sass"]
})
export class InfoComponent implements OnInit {
  constructor() {}

  @Input() info$: Observable<Information>;
  domain: string = environment.static + "/";
  format(number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  }
  toDate(date) {
    return date
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/");
  }
  ngOnInit() {}
}
