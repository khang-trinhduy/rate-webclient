import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
@Component({
  selector: "app-change",
  templateUrl: "./change.component.html",
  styleUrls: ["./change.component.sass"]
})
export class ChangeComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [6.5, 5.9, 5.7, 6.8, 6.9], label: "Online" },
    { data: [7.5, 7.0, 7.2, 7.0, 7.125], label: "Tại quầy" }
  ];
  public lineChartLabels: Label[] = [
    "02/2018",
    "08/2018",
    "02/2019",
    "08/2019",
    "02/2020"
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [{}];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];

  constructor() {}

  ngOnInit() {}
}
