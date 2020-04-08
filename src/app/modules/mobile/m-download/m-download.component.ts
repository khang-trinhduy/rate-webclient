import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-m-download',
  templateUrl: './m-download.component.html',
  styleUrls: ['./m-download.component.sass'],
})
export class MDownloadComponent implements OnInit {
  downloadForm: FormGroup
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MDownloadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.downloadForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      require: [true],
    })
  }

  download() {
    this.dialogRef.close(this.downloadForm.value)
  }
}
