import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddInterestComponent } from "src/app/layout/add-interest/add-interest.component";
import { RateService } from "src/app/services/rate.service";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.sass"]
})
export class UpdateComponent implements OnInit {
  constructor(private dialog: MatDialog, private service: RateService) {}

  ngOnInit() {}

  addRate() {
    let dialogRef = this.dialog.open(AddInterestComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.service.addInterest(result).subscribe(res => console.log(res));
    });
  }
  addBank() {
    let dialogRef = this.dialog.open(AddInterestComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.service.addInterest(result).subscribe(res => console.log(res));
    });
  }
  updateRate() {
    let dialogRef = this.dialog.open(AddInterestComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.service.addInterest(result).subscribe(res => console.log(res));
    });
  }
  updateBank() {
    let dialogRef = this.dialog.open(AddInterestComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.service.addInterest(result).subscribe(res => console.log(res));
    });
  }
}
