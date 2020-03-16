import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-subscribe",
  templateUrl: "./subscribe.component.html",
  styleUrls: ["./subscribe.component.sass"]
})
export class SubscribeComponent implements OnInit {
  subscribeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.subscribeForm = this.fb.group({
      gender: ["female", Validators.required],
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  subscribe() {
    this.dialogRef.close(this.subscribeForm.value);
  }
}
