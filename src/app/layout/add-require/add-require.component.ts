import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-add-require",
  templateUrl: "./add-require.component.html",
  styleUrls: ["./add-require.component.sass"]
})
export class AddRequireComponent implements OnInit {
  form = this.fb.group({
    content: ["", Validators.required],
    date: ["", Validators.required],
    rate: ["", Validators.required]
  });
  constructor(public fb: FormBuilder) {}

  ngOnInit() {}

  save() {}
}
