import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-add-document",
  templateUrl: "./add-document.component.html",
  styleUrls: ["./add-document.component.sass"]
})
export class AddDocumentComponent implements OnInit {
  form = this.fb.group({
    name: ["", Validators.required],
    date: ["", Validators.required],
    rate: ["", Validators.required]
  });
  constructor(public fb: FormBuilder) {}

  ngOnInit() {}

  save() {}
}
