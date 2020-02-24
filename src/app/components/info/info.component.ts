import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Information } from 'src/app/models/rate';

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.sass"]
})
export class InfoComponent implements OnInit {
  constructor() {}

  @Input() info$: Observable<Information>;
  domain: string = environment.static + "/";

  ngOnInit() {}
}
