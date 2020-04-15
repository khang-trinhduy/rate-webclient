import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MDownloadComponent } from '../m-download/m-download.component'
import { MConsultComponent } from '../m-consult/m-consult.component'
import { UserService } from 'src/app/services/user.service'
import { RateService } from 'src/app/services/rate.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-m-service',
  templateUrl: './m-service.component.html',
  styleUrls: ['./m-service.component.sass'],
})
export class MServiceComponent implements OnInit {
  @ViewChild('loader', { static: false }) loader: ElementRef

  constructor(
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    let loader = this.loader.nativeElement
    ;(<HTMLElement>loader).classList.add('mkdih')
  }

  download = () => {
    let dialogRef = this.dialog.open(MDownloadComponent, {
      width: '80vw',
      height: 'auto',
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.email) {
        this.userService
          .subscribe(result)
          .subscribe((res) =>
            this._snackbar.open(
              `Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi lại thông tin lãi suất qua hòm thư ${res.email}!`,
              'Đóng thông báo',
              { duration: 5000 }
            )
          )
      }
    })
  }

  consult = () => {
    let dialogRef = this.dialog.open(MConsultComponent, {
      width: '80vw',
      height: '80vh',
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.phone) {
        this.userService.subscribe(result).subscribe(
          (res) => {
            this._snackbar.open(
              `Cảm ơn bạn đã đăng ký. Chúng tôi sẽ tiến hành liên lạc với bạn sớm nhất có thể qua SĐT ${res.phone}!`,
              'Đóng thông báo',
              { duration: 5000 }
            )
          },
          (error) => {
            console.log(error)
          },
          () => {
            // show tooltip
          }
        )
      }
    })
  }
}
