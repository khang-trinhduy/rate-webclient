import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-m-policy-detail",
  templateUrl: "./m-policy-detail.component.html",
  styleUrls: ["./m-policy-detail.component.sass"]
})
export class MPolicyDetailComponent implements OnInit {
  vib = false;
  scb = false;
  abb = false;
  tcb = false;

  constructor(
    public dialogRef: MatDialogRef<MPolicyDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    let bank = this.data.bank.toString();
    if (bank.toLowerCase() === "vib") {
      this.vib = true;
    } else if (bank.toLowerCase() === "abbank") {
      this.abb = true;
    } else if (bank.toLowerCase() === "techcombank") {
      this.tcb = true;
    } else {
      this.scb = true;
    }
  }
}
