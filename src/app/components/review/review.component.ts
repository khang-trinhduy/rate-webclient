import { Component, OnInit, Input, Inject } from "@angular/core";
import { Observable, of, merge } from "rxjs";
import { AddReviewComponent } from "src/app/layout/add-review/add-review.component";
import { MatDialog } from "@angular/material/dialog";
import { filter, first, concat } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { RateService } from "src/app/services/rate.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.sass"]
})
export class ReviewComponent implements OnInit {
  @Input() reviews: Observable<any>;
  @Input() summary: Observable<any>;
  @Input() bankid;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    private auth: AuthService,
    private srv: RateService
  ) {}

  ngOnInit() {
    // this.reviews.subscribe(res => console.log(res._id)).unsubscribe();
  }

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

  add() {
    if (!this.auth.isLoggedIn()) {
      console.log(window.location.search);

      this.router.navigate(["/signin"], {
        queryParams: {
          ref: location.pathname + location.search
        }
      });
    } else {
      const dialogRef = this.dialog.open(AddReviewComponent, {
        width: "350px",
        data: {
          userid: this.auth.currentUser()._id,
          bankid: this.bankid
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.srv.addReview(result.user, result).subscribe(res => {
            var observable = of(res);
            this.reviews = merge(observable, this.reviews);
          });
        }
      });
    }
  }
}
