import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.sass"]
})
export class ReviewComponent implements OnInit {
  @Input() reviews: Observable<any>;
  @Input() summary: Observable<any>;

  constructor() {}

  ngOnInit() {}

  getTwinkleWidth = (stars, small = false) => {
    if (small) {
      return `${Math.floor((120 * stars) / 5)}px`;
    }
    return `${Math.floor((173 * stars) / 5)}px`;
  };

  getHelperWidth = (stars, small = false) => {
    if (small) return `${Math.floor((120 * Math.floor(5 - stars)) / 5)}px`;
    return `${Math.floor((173 * Math.floor(5 - stars)) / 5)}px`;
  };

  toDate(date) {
    return date
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/");
  }
}
