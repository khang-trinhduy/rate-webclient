import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-m-consult",
  templateUrl: "./m-consult.component.html",
  styleUrls: ["./m-consult.component.sass"]
})
export class MConsultComponent implements OnInit {
  subscribeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MConsultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.subscribeForm = this.fb.group({
      gender: ["female", Validators.required],
      name: ["", Validators.required],
      phone: ["", Validators.required]
    });
  }

  subscribe() {
    this.dialogRef.close(this.subscribeForm.value);
  }
}
