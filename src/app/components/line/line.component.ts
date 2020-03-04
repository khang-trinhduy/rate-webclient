import { Component, OnInit, Input } from "@angular/core";
import { Logos } from "src/app/models/banks";

@Component({
  selector: "app-line",
  templateUrl: "./line.component.html",
  styleUrls: ["./line.component.sass"]
})
export class LineComponent implements OnInit {
  @Input() $banks;

  constructor() {}

  ngOnInit() {}

  getLogo(code) {
    if (code) {
      let bank = new Logos();
      code = code.split(" ")[0].toLowerCase();
      return bank[code];
    }
  }

  getThreshold(threshold) {
    if (threshold) {
      return `Tối thiểu ${threshold}`;
    } else {
      return "Không hạn chế";
    }
  }

  getLoc(loc) {
    if (loc === "all") {
      return "Cả nước";
    } else {
      return loc;
    }
  }

  getWithdraw(wd) {
    if (wd) {
      if (wd == 1) {
        return "Cuối kỳ";
      } else if (wd == 2) {
        return "Hàng thắng";
      } else {
        return "Sau khi gửi";
      }
    }
  }
}
