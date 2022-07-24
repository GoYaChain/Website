import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThemeOption } from 'ngx-echarts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title = 'chain';
  flage!: boolean;
  block1: boolean = false;
  block2: boolean = false;
  block3: boolean = false;
  block4: boolean = false;

  offsecPage: number = 0;
  @ViewChild("timeline", { static: false }) public section?: ElementRef;
 
  constructor() { }
  ngAfterViewInit(): void {
    this.offsecPage = this.section?.nativeElement.offsetTop;
    console.log("offset top", this.section?.nativeElement.offsetTop);
  }
  public get width() {
    return window.innerWidth;
  }
  ngOnInit(): void {
    if (this.width <= 425) {
      this.flage = true;
    } else {
      this.flage = false;
    }
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let pos = this.offsecPage - 300;
    let pos2 = pos + 10;

    if (number < pos) {
      this.block1 = false;
      this.block2 = false;
      this.block3 = false;
      this.block4 = false;
    }
    if (number > pos) {
      this.block1 = true;
      this.block2 = false;
      this.block3 = false;
      this.block4 = false;
    }
    if (number > pos + 300) {
      this.block2 = true;

      this.block3 = false;
      this.block4 = false;
    }
    if (number > pos + 500) {
      this.block3 = true;

      this.block4 = false;
    }
    if (number > pos + 750) {
      this.block4 = true;
    }
  }

  litepaper() {
    window.location.href = "https://doc.goyachain.com/"
  }
  join() {
    window.location.href = "https://Dashboard.goyachain.com"
  }
}
