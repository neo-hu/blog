import {Component, Input, OnInit} from '@angular/core';
import {LoadingBarService, LoadingBarEvent, LoadingBarEventType} from './loading.service';
import {isPresent} from "./loading.utils";


@Component({
  selector: 'loading-bar',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  progress: string = '0';
  @Input() color: string = 'firebrick';
  @Input() height: string = '2px';
  @Input() show: boolean = true;

  constructor(public service: LoadingBarService) {
  }

  ngOnInit(): any {
    this.service.events.subscribe((event: LoadingBarEvent) => {
      setTimeout(()=>{
      if (event.type === LoadingBarEventType.PROGRESS && isPresent(event.value)) {
        this.progress = event.value;
      } else if (event.type === LoadingBarEventType.COLOR) {
        this.color = event.value;
      } else if (event.type === LoadingBarEventType.HEIGHT) {
        this.height = event.value;
      } else if (event.type === LoadingBarEventType.VISIBLE) {
        this.show = event.value;
      }});
    });
  }

}
