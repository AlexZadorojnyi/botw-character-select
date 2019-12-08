import { Component, OnInit } from '@angular/core';
import { HackFraudService } from '../hack-fraud.service';

@Component({
  selector: 'app-episode-filters',
  templateUrl: './episode-filters.component.html',
  styleUrls: ['./episode-filters.component.scss']
})
export class EpisodeFiltersComponent implements OnInit {

  hfService: HackFraudService;

  constructor(hfService: HackFraudService) {
    this.hfService = hfService;
  }

  ngOnInit() {
  }

}
