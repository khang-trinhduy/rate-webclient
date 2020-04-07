import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Logos } from "src/app/models/banks";
import { MatDialog } from "@angular/material/dialog";
import { MPolicyDetailComponent } from "../m-policy-detail/m-policy-detail.component";

@Component({
  selector: "app-m-policy",
  templateUrl: "./m-policy.component.html",
  styleUrls: ["./m-policy.component.sass"]
})
export class MPolicyComponent implements OnInit {
  policys = [
    {
      bank: "techcombank",
      title: "Techcombank cộng thêm 0.2% cho Khách hàng VIP",
      date: "23/03/2020"
    },
    {
      bank: "abbank",
      title: "Ngân hàng ABBank mới cập lãi suất tháng 3/2020",
      date: "20/03/2020"
    },
    {
      bank: "scb",
      title: "Chính sách cộng lãi suất tốt nhất từ SCB",
      date: "18/03/2020"
    },
    {
      bank: "vib",
      title: "Lãi suất cao nhất tại VIB",
      date: "18/03/2020"
    }
  ];

  @ViewChild("loader", { static: false }) loader: ElementRef;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    let loader = this.loader.nativeElement;
    (<HTMLElement>loader).classList.add("mkdih");
  }

  detail = bank => {
    this.dialog.open(MPolicyDetailComponent, {
      width: "87.5vw",
      height: "80vh",
      data: {
        bank: bank
      }
    });
  };

  getLogo(code) {
    if (code) {
      let bank = new Logos();
      code = code.split(" ")[0].toLowerCase();
      return bank[code];
    }
  }
}
