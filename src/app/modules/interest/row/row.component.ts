import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterContentChecked,
} from '@angular/core'
import { Bank, Stat, Interest } from 'src/app/models/rate'
import { RateService } from 'src/app/services/rate.service'
import { Banks, Logos } from 'src/app/models/banks'
import { Observable, merge, combineLatest, fromEvent, Subscription } from 'rxjs'
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { UserService } from 'src/app/services/user.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.sass'],
})
export class RowComponent implements OnInit, OnDestroy, AfterViewInit {
  banks: Bank[]
  maxs: Stat[]
  observers: Subscription[] = []
  typeahead
  downloadForm: FormGroup
  online: boolean = false
  @ViewChild('search', { static: false }) search: ElementRef
  @ViewChild('holder', { static: false }) holder: ElementRef
  @ViewChild('popup', { static: false }) popup: ElementRef
  @ViewChild('changer', { static: false }) rateChanger: ElementRef
  @ViewChildren('online') onlineRates: QueryList<any>
  @ViewChildren('offline') offlineRates: QueryList<any>
  @ViewChildren('icon') icons: QueryList<any>
  @ViewChildren('tag') tags: QueryList<any>
  @ViewChild('loader', { static: false }) loader: ElementRef

  constructor(
    private userService: UserService,
    private service: RateService,
    private fb: FormBuilder,
    private _snackbar: MatSnackBar
  ) {}
  async ngAfterViewInit() {
    let searchBox = this.search.nativeElement

    this.typeahead = fromEvent(searchBox, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter((text) => text.length >= 2),
      debounceTime(750),
      distinctUntilChanged(),
      switchMap((keywords) => this.service.searchBanks(keywords))
    )
    this.observers.push(
      this.typeahead.subscribe((res) => {
        if (res.length > 0) {
          this.banks = res
        }
      })
    )

    // this.slideShow();
    let iHolder = this.holder.nativeElement
    let popUpForm = this.popup.nativeElement
    iHolder.addEventListener('click', async () => {
      let temp = this.icons.toArray()
      let active = temp.find((e) => e._elementRef.nativeElement.classList.contains('active'))
        ._elementRef.nativeElement
      let next = active.nextElementSibling
      active.classList.remove('active')
      active.classList.remove('animate')
      if (next) {
        next.classList.add('active')
        next.classList.add('animate')
        popUpForm.classList.remove('animate')
        popUpForm.classList.add('deactive')
        await this.wait(350)
        popUpForm.classList.remove('active')
      } else {
        let xIcon = this.icons.toArray()[0]._elementRef.nativeElement
        xIcon.classList.add('active')
        xIcon.classList.add('animate')
        popUpForm.classList.add('animate')
        popUpForm.classList.remove('deactive')
        await this.wait(350)
        popUpForm.classList.add('active')
      }
    })
  }
  ngOnDestroy(): void {
    this.observers.forEach((obs) => {
      obs.unsubscribe()
    })
  }

  sortByPeriodAndLastUpdate = (rates) => {
    return rates.sort((a, b) => {
      if (a.period !== b.period) {
        return b.period - a.period
      } else {
        let x = new Date(b.lastUpdate)
        let y = new Date(a.lastUpdate)

        return x.getTime() - y.getTime()
      }
    })
  }

  /**
   *
   * params:
   *  +period: the period of rate
   *  +code: the bank code
   *
   * return: A cell object including:
   *  +max: A boolean value to indicate that the current rate is maximum of rates of the current bank
   *  +rate: A rate interface, used as @Input of cell-component
   *  +change: A change object (detail see below on getChangeProps()) serve as @Input of cell-component. Its main purpose is to display how the current rate has been changed since last change.
   *
   */
  getCellProps = (period, code, online = false) => {
    try {
      let bank = this.banks.find((e) => e.normalized === code)
      let rates = bank.interests
      if (online) {
        rates = rates.filter((rate) => rate.online)
      } else {
        rates = rates.filter((rate) => !rate.online)
      }
      let sortedRatesOfCurrentBank = this.sortByPeriodAndLastUpdate(rates)
      let currentRate = this.getCurrentRate(sortedRatesOfCurrentBank, period)
      let latestRates = this.getLatestRatesOfBank(bank)
      let isMaximum = this.getMaximumRateOfBank(latestRates, currentRate)
      let change = this.getChangeProps(sortedRatesOfCurrentBank, period, currentRate)
      let result = {
        rate: currentRate,
        max: isMaximum,
        change: change,
      }
      if (bank.normalized === 'vib') {
        let loader = this.loader.nativeElement
        ;(<HTMLElement>loader).classList.add('mkdih')
      }
      return result
    } catch (error) {
      console.log(error)
    }
  }

  getCurrentRate(rates, period) {
    return rates.find((e) => e.period === period)
  }

  /**
   *
   * params:
   *  @param {Interest[]} rates: sortedRates (sorted by decreasing period and latest update )
   *  @param {number} period: period that we want to get change props
   *  @param {Interest} currentRate: current rate that we want to see how it has been changed.
   *
   * return: return an object that have the following properties:
   *  + diff: the amount of value that has been change since last time
   *  it change (not lasttime update)
   *  + value: the string indicate how the rates value changed (flat: unchanged; inc: increased; dec: decreased)
   *
   * *note: value property should be different name but i'll keep it for now
   *
   */
  getChangeProps = (rates, period, currentRate) => {
    let results = []
    for (let i = 0; i < rates.length; i++) {
      const rate = rates[i]
      let month = new Date().getMonth() + 1
      let day1 = new Date(rate.lastUpdate).getDate()
      let month1 = new Date(rate.lastUpdate).getMonth() + 1
      if (
        rate.period === period &&
        rate.value != currentRate.value &&
        month1 === month &&
        day1 >= 1
      ) {
        results.push(rate)
      }
    }
    if (results.length <= 0) {
      return { value: 'flat', diff: undefined }
    } else {
      if (results[0].value === 0) {
        // get rid of new rates
        return { value: 'flat', diff: undefined }
      }
      let diff = parseFloat(currentRate.value.toString()) - parseFloat(results[0].value)
      if (diff > 0) {
        return { value: 'inc', diff: diff }
      } else if (diff === 0) {
        return { value: 'flat', diff: undefined }
      } else {
        return { value: 'dec', diff: diff }
      }
    }
  }

  changeRateType() {
    if (!!this.online) {
      // hide online rate
      let onlines = this.onlineRates.toArray()
      onlines.forEach((online) => {
        online.nativeElement.classList.remove('active')
      })
      // show offline rate
      let offlines = this.offlineRates.toArray()
      offlines.forEach((offline) => {
        offline.nativeElement.classList.add('active')
      })
    } else {
      // hide offline rate
      let offlines = this.offlineRates.toArray()
      offlines.forEach((offline) => {
        offline.nativeElement.classList.remove('active')
      })
      // show online rate
      let onlines = this.onlineRates.toArray()
      onlines.forEach((online) => {
        online.nativeElement.classList.add('active')
      })
    }
    let link = this.rateChanger.nativeElement as HTMLLinkElement
    link.textContent = !!this.online ? 'Tại quầy' : 'Online'
    this.online = !this.online
  }

  ngOnInit() {
    this.downloadForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      require: [true],
    })
    this.observers.push(
      this.service.getBanks(50, 1).subscribe((res) => {
        this.banks = res.items
      })
    )
    this.service.getStats().subscribe((res) => (this.maxs = res))
  }

  download() {
    this.observers.push(
      this.userService.subscribe(this.downloadForm.value).subscribe((res) => {
        this._snackbar.open(
          `Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi lại thông tin lãi suất qua hòm thư ${res.email}!`,
          'Đóng thông báo',
          { duration: 5000 }
        )
        let popUpForm = this.popup.nativeElement
        popUpForm.classList.add('deactive')
        popUpForm.classList.remove('active')
      })
    )
  }

  wait = async (ms) => {
    return new Promise((r) => setTimeout(r, ms))
  }

  getLogo(code: string) {
    if (code) {
      let bank = new Logos()
      code = code.split(' ')[0].toLowerCase()
      return `${bank[code]}`
    }
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

  getMaximumRateOfBank(rates, rate) {
    try {
      rates.sort((a, b) => b.value - a.value)
      let maximum = rates[0]
      let result = rate ? rate.value === maximum.value : false
      return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

  getLatestRatesOfBank = (bank) => {
    if (bank && bank.interests) {
      let unlimit = this.getLatest(bank.interests, 0)
      let three = this.getLatest(bank.interests, 3)
      let six = this.getLatest(bank.interests, 6)
      let twelve = this.getLatest(bank.interests, 12)
      let thirteen = this.getLatest(bank.interests, 13)
      let twentyfour = this.getLatest(bank.interests, 24)
      let thirtysix = this.getLatest(bank.interests, 36)
      let eighteen = this.getLatest(bank.interests, 18)
      return [unlimit, three, six, twelve, thirteen, eighteen, twentyfour, thirtysix]
    } else {
      console.log('bank not found or bank doesnt have any rates ' + bank.code)
      return []
    }
  }

  getLatest = (rates, period) => {
    rates = rates.filter((e) => e.period === period)
    if (rates) {
      rates.sort((a, b) => {
        let x = new Date(b.lastUpdate)
        let y = new Date(a.lastUpdate)
        return x.getTime() - y.getTime()
      })
      return rates[0]
    } else {
      console.log('cannot get rates of period ' + period)
      return {}
    }
  }

  getColor(code: string) {
    if (code) {
      let bank = new Banks()
      code = code.split(' ')[0].toLowerCase()
      return bank[code]
    }
  }

  getLink(code, period = '') {
    if (period) {
      return '/detail?b=' + code + '&t=' + period
    } else {
      return '/detail?b=' + code
    }
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  compareHandler = () => {}

  getCells = (category: string) => {}

  getMaximum = (cells: []) => {}

  addStyle = (cells: []) => {}
}
