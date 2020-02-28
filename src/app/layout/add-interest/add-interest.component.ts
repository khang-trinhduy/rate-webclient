import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-interest",
  templateUrl: "./add-interest.component.html",
  styleUrls: ["./add-interest.component.sass"]
})
export class AddInterestComponent implements OnInit {
  form = this.fb.group({
    withdraw: ["", Validators.required],
    type: ["", Validators.required],
    value: ["", Validators.required],
    bank: ["", Validators.required],
    period: ["", Validators.required],
    monthly: [""],
    threshold: [],
    loc: [""]
  });
  constructor(public fb: FormBuilder) {}

  ngOnInit() {}

  save() {}
}
