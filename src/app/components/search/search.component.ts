import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.sass"]
})
export class SearchComponent implements OnInit {
  constructor() {}
  period = "unlimit";
  gift: true | false = true;
  periods = [
    { value: "unlimit", viewValue: "Không kỳ hạn" },
    { value: "onew", viewValue: "1 tuần" },
    { value: "twow", viewValue: "2 tuần" },
    { value: "threew", viewValue: "3 tuần" },
    { value: "onem", viewValue: "1 tháng" },
    { value: "threem", viewValue: "3 tháng" },
    { value: "sixm", viewValue: "6 tháng" },
    { value: "ninem", viewValue: "9 tháng" },
    { value: "twelvem", viewValue: "12 tháng" },
    { value: "eighteenm", viewValue: "18 tháng" },
    { value: "twentyfourm", viewValue: "24 tháng" }
  ];

  ngOnInit() {}
}
