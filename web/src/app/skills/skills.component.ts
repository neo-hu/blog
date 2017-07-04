import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills = [
    {"name":"Linux", "progress": 45},
    {"name":"Python", "progress": 75},
    {"name":"Django / tornado|flask", "progress": 80},
    {"name":"mysql / redis", "progress": 80},
    {"name":"Html5 / Css3", "progress": 45},
    {"name":"Bootstrap", "progress": 90},
    {"name":"Responsive Design", "progress": 50},
    {"name":"JQuery", "progress": 85},
    {"name":"Angular", "progress": 80},
  ];
  constructor() { }

  ngOnInit() {
  }

}
