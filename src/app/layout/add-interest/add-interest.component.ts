import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { RateService } from "src/app/services/rate.service";

@Component({
  selector: "app-add-interest",
  templateUrl: "./add-interest.component.html",
  styleUrls: ["./add-interest.component.sass"]
})
export class AddInterestComponent implements OnInit {
  $banks;
  form = this.fb.group({
    value: ["", Validators.required],
    bank: ["", Validators.required],
    period: ["", Validators.required],
    threshold: []
  });
  constructor(
    private service: RateService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddInterestComponent>
  ) {}

  periods = [
    { value: 0, viewValue: "Không kỳ hạn" },
    { value: 1, viewValue: "1 Tháng" },
    { value: 2, viewValue: "2 Tháng" },
    { value: 3, viewValue: "3 Tháng" },
    { value: -1, viewValue: "1 Tuần" },
    { value: -2, viewValue: "2 Tuần" },
    { value: -3, viewValue: "3 Tuần" },
    { value: 6, viewValue: "6 Tháng" },
    { value: 9, viewValue: "9 Tháng" },
    { value: 12, viewValue: "12 Tháng" },
    { value: 13, viewValue: "13 Tháng" },
    { value: 18, viewValue: "18 Tháng" },
    { value: 24, viewValue: "24 Tháng" },
    { value: 36, viewValue: "36 Tháng" }
  ];

  ngOnInit() {
    this.$banks = this.service.getBanks(50, 1);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
