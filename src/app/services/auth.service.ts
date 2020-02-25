import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  public getToken = () => {
    return window.localStorage["token"];
  };

  public saveToken = token => {
    window.localStorage["token"] = token;
  };

  public removeToken = () => {
    window.localStorage.removeItem("token");
  };

  public isLoggedIn = () => {
    var token = this.getToken();

    if (token) {
      var payload = JSON.parse(window.atob(token.split(".")[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  public currentUser = () => {
    if (this.isLoggedIn()) {
      var token = this.getToken();
      var payload = JSON.parse(window.atob(token.split(".")[1]));
      return {
        name: payload.name,
        email: payload.email,
        _id: payload._id
      };
    }
  };
}
