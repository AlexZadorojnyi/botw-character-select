import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode-filters',
  templateUrl: './episode-filters.component.html',
  styleUrls: ['./episode-filters.component.scss']
})
export class EpisodeFiltersComponent implements OnInit {

  episodeTypes = [
    'Best of the Worst', 'Wheel of the Worst', 'Plinketto',
    'Spotlight Episode', 'Black Spine Edition', 'Battle of the Genres',
    'Christmas Special', 'Halloween Special'
  ];
  selectedEpisodeTypes = [];

  constructor() {
    this.selectedEpisodeTypes = Object.assign([], this.episodeTypes);
  }

  select(episodeType: string) {
    const i = this.selectedEpisodeTypes.indexOf(episodeType);
    if (i !== -1) {
      this.selectedEpisodeTypes.splice(i, 1);
    } else {
      this.selectedEpisodeTypes.push(episodeType);
    }
    console.log(this.selectedEpisodeTypes);
  }

  reset() {
    this.selectedEpisodeTypes = Object.assign([], this.episodeTypes);
    console.log(this.selectedEpisodeTypes);
  }

  ngOnInit() {
  }

}
