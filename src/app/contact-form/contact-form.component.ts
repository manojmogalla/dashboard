import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from './contact-form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitted: boolean = false;
  formModel: any = {};
  verifiedEmail: any;
  email: any;

  constructor(
     private formBuilder: FormBuilder,
     public contactFormService: ContactFormService,
     private toastr: ToastrService) { }


  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      textArea: ['', Validators.required],

    });
  }

/* mobile number 10 digits validation */
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.key != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  async verifyForm() {
    this.isSubmitted = true;
    if (this.contactForm.valid) {
      this.email = this.contactForm.value.email;
      console.log(this.contactForm.value.email);

      const isEmailValid = await this.verifyEmail();
      if (isEmailValid) {

        this.submitFormToServer();
        this.toastr.success('Email has been sent successfully');
      } else {
        this.toastr.warning('Please enter a valid business email');
      }
    }
  }

   verifyEmail(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contactFormService.getEmail(this.email).toPromise().then((validationResponse) => {
        if (validationResponse.formatCheck === "true" && validationResponse.freeCheck === "false" &&
         validationResponse.disposableCheck === "false") {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(console.error);
    });
  }
   submitFormToServer() {
    // Server API call will go here.
  }

}
