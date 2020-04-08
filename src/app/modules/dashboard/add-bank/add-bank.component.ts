import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.sass'],
})
export class AddBankComponent implements OnInit {
  addBankForm: FormGroup
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddBankComponent>) {}

  ngOnInit() {
    this.addBankForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      normalized: [''],
      link: [''],
    })
  }

  onNoClick() {
    this.dialogRef.close(null)
  }

  submit() {
    let code = this.addBankForm.get('code').value
    this.addBankForm.patchValue({ normalized: code.toLowerCase() })
    this.dialogRef.close(this.addBankForm.value)
  }
}
