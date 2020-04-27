import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class ContactFormService {

  constructor(private http: HttpClient) { }

  getEmail(email) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>(`https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_6VCCVDinQftpS4j9WmY8pPycAV814&emailAddress=${email}`);
  }


}
