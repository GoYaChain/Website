import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isShown = false;

  constructor(private toastr: ToastrService) {

  }

  ngOnInit(): void {

  }
  caledly() {
    window.location.href = "https://calendly.com/business-223/15min"
  }
  comingSoon() {
    this.toastr.success('Coming Soon!', 'GoYaChain Team')
  }
}
