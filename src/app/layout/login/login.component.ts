import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  public invalid_credentials: boolean = false;
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private api: UserService,
    private router: Router,
    private auth: AuthService
  ) {}
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  ngOnInit() {}

  login(model) {
    if (this.loginForm.valid) {
      this.api.signIn(model).subscribe(
        result => {
          if (result === undefined) {
            this.invalid_credentials = true;
            this.loginForm.setErrors({ invalid_credentials: true });
          } else {
            this.auth.saveToken(result["token"]);
            this.invalid_credentials = false;
          }
        },
        error => {},
        () => {
          if (!this.invalid_credentials) {
            let redirect = this.activeRoute.snapshot.queryParams["ref"];
            if (redirect.includes("/signin") || redirect.includes("/signup")) {
              this.router.navigateByUrl("/");
            } else {
              this.router.navigateByUrl(redirect);
            }
          } else {
            let inputs = document.getElementsByTagName("input");
            if (inputs && inputs.length > 1) {
              for (var i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                input.value = "";
              }
              const username = inputs[0];
              username.focus();
            }
          }
        }
      );
    }
  }

  public get username() {
    return this.loginForm.get("username");
  }

  public get password() {
    return this.loginForm.get("password");
  }
}
