import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-page-test",
  templateUrl: "./page-test.component.html",
  styleUrls: ["./page-test.component.scss"],
})
export class PageTestComponent implements OnInit {
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
  ngOnInit(): void { }
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
}
