import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-utility",
  templateUrl: "./add-utility.component.html",
  styleUrls: ["./add-utility.component.sass"]
})
export class AddUtilityComponent implements OnInit {
  form = this.fb.group({
    name: ["", Validators.required],
    date: ["", Validators.required],
    rate: ["", Validators.required]
  });
  constructor(public fb: FormBuilder) {}

  ngOnInit() {}

  save() {}
}
