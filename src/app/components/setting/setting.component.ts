import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.sass"]
})
export class SettingComponent implements OnInit {
  constructor() {}

  tableType: string = "row";
  @Output() tableStyleChange: EventEmitter<string> = new EventEmitter();
  ngOnInit() {}

  tableTypeRadChange = () => {
    this.tableStyleChange.emit(this.tableType);
  };
}
