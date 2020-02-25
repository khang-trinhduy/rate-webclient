import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private location: Location,
    private auth: AuthService,
    private api: UserService
  ) {}
  loc = this.location.path(false);
  ngOnInit() {}

  public get login(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    if (this.auth.isLoggedIn()) {
      this.api.signOut();
      window.location.reload(true);
    }
  }
}
