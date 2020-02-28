import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-bank",
  templateUrl: "./add-bank.component.html",
  styleUrls: ["./add-bank.component.sass"]
})
export class AddBankComponent implements OnInit {
  form = this.fb.group({
    tradeName: ["", Validators.required],
    nativeName: ["", Validators.required],
    webiste: [""],
    headquater: [""],
    founded: [""],
    type: ["", Validators.required],
    logo: [""]
  });
  constructor(public fb: FormBuilder) {}

  ngOnInit() {}

  save() {

  }
}
