import { Injectable } from '@angular/core';
import episodes from '../assets/episodes.json';

@Injectable({
  providedIn: 'root'
})
export class HackFraudService {

  Episodes: any = episodes;

  private hackFraudsSelected = [];
  private hackFraudsUnselectable = [];
  private hackFrauds = [
    'Mike', 'Jay', 'Rich',
    'Jack', 'Josh', 'Jessi',
    'Colin', 'Jim', 'Mack',
    'Freddie', 'Tim', 'Len',
    'Simon', 'Shawn', 'Patton',
    'Max', 'Gillian'
  ];

  private episodeTypesSelected = [];
  private episodeTypes = [
    'Best of the Worst', 'Wheel of the Worst', 'Plinketto',
    'Spotlight Episode', 'Black Spine Edition', 'Battle of the Genres',
    'Christmas Special', 'Halloween Special'
  ];

  private episodesAvailable = this.Episodes.slice();

  constructor() {
    this.episodeTypesSelected = Object.assign([], this.episodeTypes);
  }

  getHackFrauds() {
    return this.hackFrauds.slice();
  }

  getHackFraudsSelected() {
    return this.hackFraudsSelected.slice();
  }

  selectHackFraud(hackFraud: string) {
    const i = this.hackFraudsSelected.indexOf(hackFraud);
    if (i === -1) {
      if (!this.hackFraudsUnselectable.includes(hackFraud)) {
        this.hackFraudsSelected.push(hackFraud);
      }
    } else {
      this.hackFraudsSelected.splice(i, 1);
    }
    this.hackFraudsSelected.sort();
    // console.log(this.hackFraudsSelected);
    // console.log(this.Episodes);
    this.filterEpisodes();
    this.filterHackFrauds();
  }

  hackFraudIsSelected(hackFraud: string) {
    return this.hackFraudsSelected.includes(hackFraud);
  }

  hackFraudIsUnselectable(hackFraud: string) {
    return this.hackFraudsUnselectable.includes(hackFraud);
  }

  filterHackFrauds() {
    let hackFraudsTemp = this.hackFraudsSelected;
    this.episodesAvailable.forEach(episode => {
      let i = 0;
      this.hackFraudsSelected.forEach(hackFraud => {
        if (episode.cast.includes(hackFraud)) {
          i++;
        }
      });
      if (i === this.hackFraudsSelected.length) {
        hackFraudsTemp = hackFraudsTemp.concat(episode.cast.filter(
          hackFraud => !hackFraudsTemp.includes(hackFraud)
        ));
      }
    });
    this.hackFraudsUnselectable = this.hackFrauds.filter(
      hackFraud => !hackFraudsTemp.includes(hackFraud)
    );
  }

  getEpisodeTypes() {
    return this.episodeTypes;
  }

  selectEpisodeFilter(episodeType: string) {
    const i = this.episodeTypesSelected.indexOf(episodeType);
    if (i !== -1) {
      this.episodeTypesSelected.splice(i, 1);
    } else {
      this.episodeTypesSelected.push(episodeType);
    }
    // console.log(this.episodeTypesSelected);
    this.filterEpisodes();
  }

  episodeTypeIsSelected(episodeType: string) {
    return this.episodeTypesSelected.includes(episodeType);
  }

  resetEpisodeFilters() {
    this.episodeTypesSelected = Object.assign([], this.episodeTypes);
    console.log(this.episodeTypesSelected);
  }

  getEpisodesAvailable() {
    return this.episodesAvailable;
  }

  filterEpisodes() {
    let episodesTemp = this.Episodes.slice();
    this.hackFraudsSelected.forEach(hackFraud =>
      episodesTemp = episodesTemp.filter(episode =>
        episode.cast.includes(hackFraud)
      ));
    // episodesTemp = episodesTemp.filter(this.episodeTypeIntersect);
    // console.log(episodesTemp);
    this.episodesAvailable = episodesTemp;
  }
}
