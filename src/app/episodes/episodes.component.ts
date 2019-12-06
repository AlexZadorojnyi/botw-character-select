import { Component, OnInit } from '@angular/core';
import { HackFraudService } from '../hack-fraud.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  hfService: HackFraudService;

  constructor(hfService: HackFraudService) {
    this.hfService = hfService;
  }

  ngOnInit() {
  }

}
