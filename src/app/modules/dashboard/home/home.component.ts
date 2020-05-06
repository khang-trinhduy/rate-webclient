import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AddBankComponent } from '../add-bank/add-bank.component'
import { RateService } from 'src/app/services/rate.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { AddRateComponent } from '../add-rate/add-rate.component'
import { Bank } from 'src/app/models/rate'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  observables: Subscription[] = []
  tabIndex = 0
  selectedBank: Bank
  uploadForm: FormGroup
  importError = ''
  importResult = { total: 0, ok: 0, errors: [] }
  isOnline: boolean = false
  @ViewChild('tab', { static: false, read: ElementRef }) tab: ElementRef<any>
  @ViewChild('progress', { static: false, read: ElementRef }) progress: ElementRef<any>
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private rateService: RateService
  ) {}
  ngOnDestroy(): void {
    this.observables.forEach((obs) => obs.unsubscribe())
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      rates: ['', Validators.required],
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBankComponent, {
      width: 'auto',
      height: 'auto',
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner()
      if (result) {
        this.observables.push(
          this.rateService.addBank(result).subscribe((res) => {
            this.hideSpinner()
            if (res) {
              this._snackBar.open(`Bank ${res.name} created`, 'Close', {
                duration: 3000,
              })
            }
          })
        )
      }
    })
  }

  openAnotherDialog(): void {
    const dialogRef = this.dialog.open(AddRateComponent, {
      width: 'auto',
      height: 'auto',
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner()
      if (result) {
        this.observables.push(
          this.rateService.addRate(result).subscribe((res) => {
            this.hideSpinner()

            if (res) {
              this._snackBar.open(
                `Rate { ${result.bank}-${result.period}-${result.value} } created`,
                'Close',
                {
                  duration: 3000,
                }
              )
            }
          })
        )
      }
    })
  }

  selectBankHandler = (bank) => {
    this.tabIndex = 1
    this.selectedBank = bank
  }

  changeTabIndex = (event) => {
    this.tabIndex = event
  }

  generataRate(bank, period, value, threshold) {
    return {
      bank: bank,
      period: period,
      value: value !== 'thỏa thuận' ? parseFloat(value.split('%')[0]) || -10 : -100,
      lastUpdate: new Date(),
      createBy: 'system',
      threshold: threshold.trim(),
      online: this.isOnline,
    }
  }

  arrayToRates(arr: Array<string>) {
    if (arr.length !== 23) {
      return []
    }
    const bank = arr[0].trim()
    const unlimit = this.generataRate(bank, 0, arr[1], arr[2])
    const one = this.generataRate(bank, 1, arr[3], arr[4])
    const two = this.generataRate(bank, 2, arr[5], arr[6])
    const three = this.generataRate(bank, 3, arr[7], arr[8])
    const six = this.generataRate(bank, 6, arr[9], arr[10])
    const nine = this.generataRate(bank, 9, arr[11], arr[12])
    const twelve = this.generataRate(bank, 12, arr[13], arr[14])
    const thirteen = this.generataRate(bank, 13, arr[15], arr[16])
    const eighteen = this.generataRate(bank, 18, arr[17], arr[18])
    const twentyF = this.generataRate(bank, 24, arr[19], arr[20])
    const thirtyS = this.generataRate(bank, 36, arr[21], arr[22])
    return [unlimit, one, two, three, six, nine, twelve, thirteen, eighteen, twentyF, thirtyS]
  }

  parseLine(line: String, number: number) {
    try {
      let arr = line.split('\t')
      arr = arr.map((e) => {
        e = e.toLowerCase()
        e = e.replace('-', '')
        return e
      })
      const rates = this.arrayToRates(arr)
      this.importResult.total++
      if (rates.length === 0 || rates.length !== 11) {
        this.importResult.errors.push(`error occurred at line number ${number}`)
      } else {
        this.importResult.ok++
      }
      return rates
    } catch (error) {
      this.importResult.errors.push(error.message)
    }
  }

  parseToRate(str: string) {
    const lines = str.split('\n')
    let rates = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.trim() !== '') {
        rates = [...rates, this.parseLine(line, i + 1)]
      }
    }
    return rates
  }

  showSpinner() {
    const tabElem = this.tab.nativeElement
    const progressElem = this.progress.nativeElement

    if (tabElem && progressElem) {
      tabElem.classList.add('active')
      progressElem.classList.add('active')
    }
  }

  hideSpinner() {
    const tabElem = this.tab.nativeElement as HTMLElement
    const progressElem = this.progress.nativeElement as HTMLElement
    if (
      tabElem &&
      progressElem &&
      tabElem.classList.contains('active') &&
      progressElem.classList.contains('active')
    ) {
      tabElem.classList.remove('active')
      progressElem.classList.remove('active')
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file')
    this.importResult = { errors: [], ok: 0, total: 0 }
    this.showSpinner()

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader()
      reader.onload = ({ target }) => {
        if ('TextDecoder' in window) {
          // Decode as UTF-8
          var dataView = new DataView(reader.result as ArrayBuffer)
          var decoder = new TextDecoder('utf8')
          const fileContent = decoder.decode(dataView)
          const rates = this.parseToRate(fileContent)
          let results = [].concat(...rates)
          this.uploadForm.patchValue({ rates: results })
          this.observables.push(
            this.rateService.import(this.uploadForm.value).subscribe((res) => {
              this.hideSpinner()
              this._snackBar.open(
                `import: ${this.importResult.total} banks, success: ${
                  this.importResult.ok
                } banks, fail: ${this.importResult.total - this.importResult.ok} banks`,
                'ok',
                { duration: 10000 }
              )
            })
          )
        } else {
          // Fallback decode as ASCII
          var decodedString = String.fromCharCode.apply(
            null,
            new Uint8Array(reader.result as ArrayBuffer)
          )
          const fileContent = decodedString
          const rates = this.parseToRate(fileContent)
          let results = [].concat(...rates)
          this.uploadForm.patchValue({ rates: results })
          this.observables.push(
            this.rateService.import(this.uploadForm.value).subscribe((res) => {
              this.hideSpinner()
              this._snackBar.open(
                `import: ${this.importResult.total} banks, success: ${
                  this.importResult.ok
                } banks, fail: ${this.importResult.total - this.importResult.ok} banks`,
                'ok',
                { duration: 10000 }
              )
            })
          )
        }
      }
      reader.readAsArrayBuffer(inputNode.files[0])
    }
  }
}
