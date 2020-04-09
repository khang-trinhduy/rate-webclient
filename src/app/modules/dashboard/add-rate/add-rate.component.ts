import { Component, OnInit } from '@angular/core'
import { RateService } from 'src/app/services/rate.service'
import { Subscription } from 'rxjs'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-add-rate',
  templateUrl: './add-rate.component.html',
  styleUrls: ['./add-rate.component.sass'],
})
export class AddRateComponent implements OnInit {
  constructor(
    private rateService: RateService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRateComponent>
  ) {
    this.addRateForm = this.fb.group({
      bank: ['', Validators.required],
      period: ['', Validators.required],
      value: ['', Validators.required],
      threshold: [''],
    })
    this.observables.push(
      this.rateService.getBanks(100, 1).subscribe((res) => (this.banks = res.items))
    )
  }

  periods = [
    { value: 0, viewValue: 'Không kỳ hạn' },
    { value: 1, viewValue: '1 tháng' },
    { value: 2, viewValue: '2 tháng' },
    { value: 3, viewValue: '3 tháng' },
    { value: 6, viewValue: '6 tháng' },
    { value: 9, viewValue: '9 tháng' },
    { value: 12, viewValue: '12 tháng' },
    { value: 13, viewValue: '13 tháng' },
    { value: 18, viewValue: '18 tháng' },
    { value: 24, viewValue: '24 tháng' },
    { value: 36, viewValue: '36 tháng' },
    { value: 48, viewValue: '48 tháng' },
    { value: 60, viewValue: '60 tháng' },
    { value: -10, viewValue: 'Không hỗ trợ' },
    { value: -100, viewValue: 'Thỏa thuận' },
  ]

  banks
  observables: Subscription[] = []
  addRateForm: FormGroup

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close(null)
  }

  submit() {
    this.dialogRef.close(this.addRateForm.value)
  }
}
