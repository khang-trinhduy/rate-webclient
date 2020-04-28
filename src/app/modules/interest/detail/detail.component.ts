import { Component, OnInit, OnDestroy } from '@angular/core'
import { RateService } from 'src/app/services/rate.service'
import { ActivatedRoute } from '@angular/router'
import { Bank, Information, Utility, Interest } from 'src/app/models/rate'
import { Observable, of } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { SubscribeComponent } from '../subscribe/subscribe.component'
import { UserService } from 'src/app/services/user.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass'],
})
export class DetailComponent implements OnInit, OnDestroy {
  bank: Bank
  rate: Interest
  period
  top = true
  code
  reviews
  summary
  bankid
  others
  main
  toBeDestroyed
  constructor(
    private userService: UserService,
    private dialogRef: MatDialog,
    private service: RateService,
    private route: ActivatedRoute,
    private _snackbar: MatSnackBar
  ) {}

  ngOnDestroy() {
    this.toBeDestroyed.unsubscribe()
  }

  ngOnInit() {
    this.code = this.route.snapshot.queryParams['b']
      ? this.route.snapshot.queryParams['b']
      : this.route.snapshot.queryParams['c']
    let type = this.route.snapshot.queryParams['t'] || ''
    this.period = type
    this.toBeDestroyed = this.service.getBankById(this.code, type).subscribe(
      (res) => (this.bank = res),
      (error) => {},
      () => {
        if (this.bank) {
          let interests = this.bank.interests.sort((a, b) => {
            if (a.period != b.period) {
              return a.period - b.period
            } else {
              let x = new Date(b.lastUpdate).getTime()
              let y = new Date(a.lastUpdate).getTime()
              return x - y
            }
          })
          interests = interests.filter((e) => !e.online)
          let zero = interests.find((e) => e.period === 0)
          let two = interests.find((e) => e.period === 2)
          let three = interests.find((e) => e.period === 3)
          let nine = interests.find((e) => e.period === 9)
          let twelve = interests.find((e) => e.period === 12)
          let thirteen = interests.find((e) => e.period === 13)
          let eighteen = interests.find((e) => e.period === 18)
          let tf = interests.find((e) => e.period === 24)
          let ts = interests.find((e) => e.period === 36)
          this.others = [zero, two, three, nine, twelve, thirteen, eighteen, tf, ts]
          let one = interests.find((e) => e.period === 1)
          let six = interests.find((e) => e.period === 6)
          this.main = [one, six]
          if (this.bank.normalized === 'vib') {
            this.main = [
              {
                period: 1,
                values: [4.75, 4.75, 4.75, 4.75],
              },
              {
                period: 6,
                values: [6.7, 6.8, 6.9, 6.9],
              },
            ]
            this.others = [
              {
                period: 0,
                values: [0.5, 0.5, 0.5, 0.5],
              },
              {
                period: 2,
                values: [4.75, 4.75, 4.75, 4.75],
              },
              {
                period: 3,
                values: [4.75, 4.75, 4.75, 4.75],
              },
              {
                period: 9,
                values: [6.7, 6.8, 6.9, 6.9],
              },
              {
                period: 12,
                values: [6.7, 6.8, 6.9, 6.9],
              },
              {
                period: 13,
                values: [7.59, 7.59, 7.59, 7.59],
              },
              {
                period: 18,
                values: [7, 7.1, 7.2, 7.2],
              },
              {
                period: 24,
                values: [7.3, 7.4, 7.5, 7.5],
              },
              {
                period: 36,
                values: [7.3, 7.4, 7.5, 7.5],
              },
            ]
          }
        }
      }
    )
    window.addEventListener('load', () => {
      let elems = document.querySelectorAll('.mnOpd')
      for (let i = 0; i < elems.length; i++) {
        const element = elems[i]
        element.addEventListener('mouseenter', () => {
          let show = element.querySelector('a')
          ;(<HTMLElement>show).style.right = '5px'
          ;(<HTMLElement>show).style.opacity = '1'
        })
        element.addEventListener('mouseleave', () => {
          let show = element.querySelector('a')
          ;(<HTMLElement>show).style.right = '-97.5px'
          ;(<HTMLElement>show).style.opacity = '0'
        })
      }
    })
  }

  isMax = (value) => value === 7.59

  isVib = () => this.bank.normalized === 'vib'

  max = (value) => {
    let maximum
    of(this.main, this.others).subscribe((res) => {
      maximum = res.sort((a, b) => {
        return b.value - a.value
      })
    })
    return value === maximum[0].value
  }

  subscribe(bank) {
    const dialog = this.dialogRef.open(SubscribeComponent, {
      width: 'auto',
    })

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        result.bank = bank
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

  toDecimal = (number) => {
    if (number > 0) {
      return (Math.round(number * 100) / 100).toFixed(2) + '%'
    } else if (number == -100) {
      return 'Thỏa thuận'
    } else {
      return 'không hỗ trợ'
    }
  }
}
