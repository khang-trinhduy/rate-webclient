import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.sass"]
})
export class CardComponent implements OnInit {
  @Input() rate;
  @Input() gifts;
  constructor() {}

  toDate(date) {
    return date
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/");
  }

  ngOnInit() {}
}
