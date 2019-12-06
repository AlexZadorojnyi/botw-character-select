import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit {

  hackFrauds = [
    'Mike', 'Jay', 'Rich',
    'Jack', 'Josh', 'Jessi',
    'Colin', 'Jim', 'Mack',
    'Freddie', 'Tim', 'Len',
    'Simon', 'Shawn', 'Patton',
    'Max', 'Gillian'
  ];

  selectedFrauds = [];

  constructor() { }

  select(hackFraud: string) {
    const i = this.selectedFrauds.indexOf(hackFraud);
    if (i !== -1) {
      this.selectedFrauds.splice(i, 1);
    } else {
      this.selectedFrauds.push(hackFraud);
    }
    console.log(this.selectedFrauds);
  }

  ngOnInit() {
  }

}
