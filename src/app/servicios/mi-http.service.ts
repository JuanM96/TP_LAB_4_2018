import { Injectable } from '@angular/core';

import {Http ,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { headersToString } from '../../../node_modules/@types/selenium-webdriver/http';

@Injectable()
export class MiHttpService {
  
  constructor(public http:Http) { }
  
  public httpGetPromise(url: string,tokenAuth:string){
    
    let header = new Headers({
      "token":tokenAuth
    });
    return this.http
    .get(url,{headers:header})
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }
  public httpPostPromise(url: string, objeto:any){
    return this.http
    .post(url,objeto)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }
  public httpPostPromiseWithToken(url: string, objeto:any,tokenAuth:string){  
    let header = new Headers({
      "token":tokenAuth
    });
      return this.http
      .post(url,objeto,{headers:header})
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
  }
  private extraerDatos(resp:Response) {

      return resp.json() || {};

  }
  private handleError(error:Response | any) {

      return error;
  }

}
