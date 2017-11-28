import { Component, OnInit } from '@angular/core';

@Component({
  selector:  'app-skills',
  templateUrl:  './skills.component.html',
  styleUrls:  ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills = [
    [
      {'name': 'Linux', 'progress':  45},
      {'name': 'Python', 'progress':  75},
      {'name': 'Go', 'progress':  50},
      {'name': 'Html / Html5 / Css3', 'progress':  65},
      {'name': 'javascript / typescript', 'progress':  75},
    ], [
      {'name': 'Django / tornado', 'progress':  80},
      {'name': 'JQuery', 'progress':  85},
      {'name': 'Angular / Angular2+', 'progress':  80},
      {'name': 'Bootstrap', 'progress':  90},
    ], [
    {'name': 'mysql / redis', 'progress':  75},
    {'name': 'Responsive Design', 'progress':  50},
  ]]
  constructor() { }

  ngOnInit() {
  }

}
