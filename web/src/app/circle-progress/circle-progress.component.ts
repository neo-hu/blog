import {Component, OnInit, OnChanges, OnDestroy, Input, ViewChild} from '@angular/core';
import {isUndefined} from "util";
import ProgressBar from 'progressbar.js/dist/progressbar';
import { ThemesService } from '../themes/themes.component';

@Component({
  selector: '[circle-progress]',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss']
})
export class CircleProgressComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if(this.bar){
      this.bar.destroy();
    }
  }


  @Input('circle-progress') progress;
  @ViewChild('svg') svg;
  bar;


  constructor(private themesService:ThemesService) {
  }

  setBar(){
    if(this.bar){
      this.bar.destroy();
    }
    let div = document.createElement("div");
    this.svg.nativeElement.appendChild(div);
    this.bar = new ProgressBar.Circle(div, {
      color: "#292b2c",
      strokeWidth: 2,
      trailWidth: 2,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: {color: this.themesService.theme, width: 2},
      to: {color: this.themesService.theme, width: 2},
      step: (state, circle) => {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        let value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText("<div class='text-center' style='font-size: 150%;'>"+value+"%</div>");
        }
      }
    });
    this.bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    this.bar.text.style.fontSize = '1rem';
    this.bar.animate(this.progress/100);
  }

  ngOnInit() {
    this.setBar();
    this.themesService.events.subscribe(t=>{
      this.setBar();
    })
  }

}
