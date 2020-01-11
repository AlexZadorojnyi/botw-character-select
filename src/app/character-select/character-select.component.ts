import { Component, OnInit } from '@angular/core';
import { HackFraudService } from '../hack-fraud.service';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit {

  hfService: HackFraudService;

  constructor(hfService: HackFraudService) {
    this.hfService = hfService;
  }

  ngOnInit() {}

}
