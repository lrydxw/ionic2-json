import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HomeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HomeService {
    constructor(public http: Http) {
        console.log('Hello HomeService Provider');
    }

    get() {
        return new Promise((resolve, reject) => {
            this.http.get("http://192.168.1.162:8080/layersConfig.txt")
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data);
                    resolve(data);
                }, err => {
                    reject(err);
                })
        })
    }

    post() {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body= "username=15867172306&password=123";
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:6005/XBETC/Account/Login', body, options )
                .map(res => res.json())
                .subscribe(data => resolve(data), err => reject(err))
        })
    }
/*
    post() {
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        let pramas = JSON.stringify({ username: "", password: "" })
        return new Promise((resolve, reject) => {
            this.http.post("http://localhost:6005/XBETC/Account/Login", pramas, header)
                .map(res => res.json())
                .subscribe(data => resolve(data), err => reject(err))
        })
    }
*/
}
