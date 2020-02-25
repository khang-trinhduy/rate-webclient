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
  showTool = true;
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

  toggleTool() {
    var tool = document.querySelector(".tool-container");
    if (this.showTool) {
      if (tool) {
        (<HTMLElement>tool).style.animation =
          "push 0.35s linear 0s forwards 1 normal";
      }
    } else {
      if (tool) {
        (<HTMLElement>tool).style.animation =
          "pull 0.35s linear 0s forwards 1 normal";
      }
    }
    this.showTool = !!!this.showTool;
  }
}
