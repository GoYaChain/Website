import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ops",
  templateUrl: "./ops.component.html",
  styleUrls: ["./ops.component.scss"],
})
export class OpsComponent implements OnInit {
  constructor() {}
  word: string = "";
  isTrue: boolean;
  isFalse:boolean=false
  help:boolean=false
  list1 = [
    "S",
    "A",
    "c",
    "H",
    "G",

    "E",
    "T",
    "O",
    "X",
    "P",

    "V",
    "U",
    "N",
    "S",
    "B",

    "J",
    "P",
    "X",
    "K",
    "A",

    "W",
    "R",
    "Z",
    "M",
    "H",
  ];
  ngOnInit(): void {}

  check(w) {
    if (this.word == "stnkh") {
      this.isTrue = true;
      this.isFalse = true;

    } else {
      this.isFalse = true;
    }
  }
}
