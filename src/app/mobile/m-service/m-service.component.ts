import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MDownloadComponent } from "../m-download/m-download.component";
import { MConsultComponent } from "../m-consult/m-consult.component";
import { UserService } from "src/app/services/user.service";
import { RateService } from "src/app/services/rate.service";

@Component({
  selector: "app-m-service",
  templateUrl: "./m-service.component.html",
  styleUrls: ["./m-service.component.sass"]
})
export class MServiceComponent implements OnInit {
  @ViewChild("loader", { static: false }) loader: ElementRef;

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    let loader = this.loader.nativeElement;
    (<HTMLElement>loader).classList.add("mkdih");
  }

  download = () => {
    let dialogRef = this.dialog.open(MDownloadComponent, {
      width: "80vw",
      height: "auto"
    });
    dialogRef.afterClosed().subscribe(res => {
      this.userService.subscribe(res).subscribe(res => console.log(res));
    });
  };

  consult = () => {
    let dialogRef = this.dialog.open(MConsultComponent, {
      width: "80vw",
      height: "80vh"
    });
    dialogRef.afterClosed().subscribe(res => {
      this.userService.subscribe(res).subscribe(res => {
        console.log(res);
      });
    });
  };
}
