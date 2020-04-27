import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

@HostListener('window:resize', ['$event'])

export class AppComponent implements OnInit {
  _opened: boolean = false;

  width: number = window.innerWidth;
  height: number = window.innerHeight;
  slideType: any;
  innerWidth: any;


  ngOnInit(): void {

    if (this.width <= 768) {
      this.slideType = "slide";
    }
    if (this.width > 768) {
      this.slideType = "push";
    }
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }
}
