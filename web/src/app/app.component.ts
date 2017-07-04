import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: '[neo-app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  showMenu = false;
  ngOnInit(): void {

    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.showMenu = false;
        }
      });
  }

  constructor(private router: Router, private route: ActivatedRoute,){

  }
}
