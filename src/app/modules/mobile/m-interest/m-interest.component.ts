import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-m-interest",
  templateUrl: "./m-interest.component.html",
  styleUrls: ["./m-interest.component.sass"]
})
export class MInterestComponent implements OnInit {
  @ViewChild("loader", { static: false }) loader: ElementRef;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    let loader = this.loader.nativeElement;
    (<HTMLElement>loader).classList.add("mkdih");
  }

  ngAfterViewChecked(): void {
  }

  ngAfterContentInit(): void {
  }

  recommend = () => this.router.navigateByUrl("recommend");
  service = () => this.router.navigateByUrl("service");
  compare = () => this.router.navigateByUrl("compare");
  policy = () => this.router.navigateByUrl("policy");
}
