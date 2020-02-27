import { Component, OnInit, Input, Inject } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-review",
  templateUrl: "./add-review.component.html",
  styleUrls: ["./add-review.component.sass"]
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup = this.fb.group({
    title: [""],
    content: ["", Validators.required],
    bank: ["", Validators.required],
    user: ["", Validators.required],
    stars: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  save() {}
}
