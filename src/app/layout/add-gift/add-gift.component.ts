import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-gift",
  templateUrl: "./add-gift.component.html",
  styleUrls: ["./add-gift.component.sass"]
})
export class AddGiftComponent implements OnInit {
  form = this.fb.group({
    name: ["", Validators.required],
    date: ["", Validators.required],
    rate: ["", Validators.required]
  });
  constructor(public fb: FormBuilder) {}

  ngOnInit() {}

  save() {}
}
