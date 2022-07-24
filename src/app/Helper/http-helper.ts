import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams, HttpEvent } from "@angular/common/http";
import { MyAppConfig, APP_CONFIG } from "../config/config";
import { Observable } from "rxjs";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class HttpHelper {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: MyAppConfig,
    private router: Router,
  ) { }

  async get<T>(url: string, token: string, params: string[], isRestore = false, title = "") {

    let httpEvent: Observable<HttpEvent<T>>;
    if (!isRestore) {
      return new Promise((yes, no) => {
        if (params.length > 0)
          if (params.length < 3)
            httpEvent = this.httpClient.get<T>(url, this.config.requestHeader(token, new HttpParams().set(params[0], params[1])));
          else if (params.length == 4)
            httpEvent = this.httpClient.get<T>(
              url,
              this.config.requestHeader(token, new HttpParams().set(params[0], params[1]).set(params[2], params[3]))
            );
          else

            httpEvent = this.httpClient.get<T>(
              url,
              this.config.requestHeader(token, new HttpParams().set(params[0], params[1]).set(params[2], params[3]).set(params[4], params[5]))
            );
        else httpEvent = this.httpClient.get<T>(url, this.config.requestHeader(token, new HttpParams()));

        httpEvent.subscribe(
          (response) => {
            yes(response);
          },
          (err: HttpErrorResponse) => {
            no(err.error)


            if (err.status == 499) {
              // Swal.close();

            }
          }
        );
      });
    } else {


    }
  }

  async post(url: string, body: any, token: string, title: string, withUrl: boolean = false, flag?: boolean) {

    if (flag) {

    } else {

    }

    return new Promise((yes, no) => {
      this.httpClient.post(url, body, this.config.requestHeader(token, new HttpParams(), withUrl)).subscribe(
        (response) => {
          yes(response);

          //   Swal.fire('Added!', title + ' has been Added Successfully.', 'success');
          if (flag) {

          } else {

          }
        },
        (err: HttpErrorResponse) => {
          no(err.error);

          if (err.status == 499) {
            // Swal.close();
            localStorage.clear();
            // this.router.navigate(["/login"]);
          }
          if (err.error) {
            // Swal.close();
           console.log("err.error::",err.error)
          }
          // if (err.error.msg.includes("Sorry ,This Table is Already Reserved")) {
          //   // this.router.navigate(['./login'])
          // }
        }
      );
    });
  }



  async post_no_swal(url: string, body: any, token: string, title: string, withUrl: boolean = false, flag?: boolean) {



    return new Promise((yes, no) => {
      this.httpClient.post(url, body, this.config.requestHeader(token, new HttpParams(), withUrl)).subscribe(
        (response) => {
          yes(response);

        },
        (err: HttpErrorResponse) => {
          no(err.error);

        }
      );
    });
  }

  async delete(url: string, token: string, title: string, route: string|any = null, navigate: boolean = false) {
    // this.validate(token);

    return new Promise((yes, no) => {
      this.httpClient.delete(url, this.config.requestHeader(token)).subscribe(
        (response) => {
          yes(response);


          if (route != null) this.router.navigate([route]);
          if (navigate) window.location.reload();
        },
        (err: HttpErrorResponse) => {
          no(err.error);

        }
      );
    });
  }

}