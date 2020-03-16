import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-subscribe",
  templateUrl: "./subscribe.component.html",
  styleUrls: ["./subscribe.component.sass"]
})
export class SubscribeComponent implements OnInit {
  subscribeForm: FormGroup;
  constructor(private fb: FormBuilder, private service: UserService) {}

  ngOnInit() {
    this.subscribeForm = this.fb.group({
      gender: ["female", Validators.required],
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  subscribe() {
    this.service.subscribe(this.subscribeForm.value)
    .subscribe(
      res => console.log(res),
      error => console.log(error),
      () => {
        // show completed and close dialog
      }
    );
  }
}
