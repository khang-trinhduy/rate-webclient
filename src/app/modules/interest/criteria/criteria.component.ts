import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.sass'],
})
export class CriteriaComponent implements OnInit {
  vib = false
  scb = false
  abb = false
  tcb = false
  pvc = false
  vibn = false

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    let bank = this.activeRoute.snapshot.queryParams['bank']
    if (bank.toLowerCase() == 'vib') {
      this.vib = true
    } else if (bank.toLowerCase() == 'abb') {
      this.abb = true
    } else if (bank.toLowerCase() == 'tcb') {
      this.tcb = true
    } else if (bank.toLowerCase() == 'pvc') {
      this.pvc = true
    } else if (bank.toLowerCase() === 'vibn') {
      this.vibn = true
    } else {
      this.scb = true
    }
  }
}
