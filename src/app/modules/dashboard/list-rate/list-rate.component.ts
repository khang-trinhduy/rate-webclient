import { Component, OnInit, Input } from '@angular/core'
import { Bank } from 'src/app/models/rate'

@Component({
  selector: 'app-list-rate',
  templateUrl: './list-rate.component.html',
  styleUrls: ['./list-rate.component.sass'],
})
export class ListRateComponent implements OnInit {
  @Input() bank: Bank

  constructor() {}

  ngOnInit() {}
}
