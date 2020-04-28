import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CovidStatusService {

  constructor(private http: HttpClient) { }

  getWorldCovidStatus() {
    return this.http.get<any>('https://api.covid19api.com/summary');
  }
  getIndiaCovidStatus() {
    return this.http.get<any>('https://api.covid19india.org/state_district_wise.json');
  }


  /*dummy api fot table sorting */
  getPatientDetails() {
    return this.http.get<any>('https://api.npoint.io/f7566397b63382426c6c');

  }

}

