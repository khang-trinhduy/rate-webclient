import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.sass"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: UserService,
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl(this.activeRoute.snapshot.queryParams["ref"]);
    }
  }

  public invalid_credentials: boolean = false;

  signupForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    email: ["", Validators.required]
  });

  signup(model) {
    if (this.signupForm.valid) {
      this.api.signUp(model).subscribe(
        result => {
          if (result === undefined) {
            this.invalid_credentials = true;
          } else {
            this.auth.saveToken(result["token"]);
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
          }
        }
      );
    }
  }

  isLoggedIn = () => {
    return this.auth.isLoggedIn();
  };

  get username() {
    return this.signupForm.get("username");
  }

  get password() {
    return this.signupForm.get("password");
  }

  get email() {
    return this.signupForm.get("email");
  }
}
