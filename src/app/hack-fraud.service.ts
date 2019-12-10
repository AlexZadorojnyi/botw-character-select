import { Injectable } from '@angular/core';
import episodes from '../assets/episodes.json';

@Injectable({
  providedIn: 'root'
})
export class HackFraudService {

  Episodes: any = episodes;

  private hackFraudsUnselectable = [];
  private hackFrauds = [
    'Mike', 'Jay', 'Rich',
    'Jack', 'Josh', 'Jessi',
    'Colin', 'Jim', 'Mack',
    'Freddie', 'Tim', 'Len',
    'Simon', 'Shawn', 'Patton',
    'Max', 'Gillian'
  ];

  private episodeTypes = [
    'Best of the Worst', 'Wheel of the Worst', 'Plinketto',
    'Spotlight Episode', 'Black Spine Edition', 'Battle of the Genres',
    'Christmas Special', 'Halloween Special'
  ];

  private episodeFilters = {
    cast: [],
    types: [],
    typeModifiers: [],
    reverseOrder: true
  };

  constructor() {
    this.episodeFilters.types = Object.assign([], this.episodeTypes);
  }

  getEpisodeFilters() {
    return this.episodeFilters;
  }

  getHackFrauds() {
    return this.hackFrauds.slice();
  }

  getHackFraudsSelected() {
    return this.episodeFilters.cast.slice();
  }

  selectHackFraud(hackFraud: string) {
    const i = this.episodeFilters.cast.indexOf(hackFraud);
    if (i === -1) {
      if (!this.hackFraudsUnselectable.includes(hackFraud)) {
        this.episodeFilters.cast.push(hackFraud);
      }
    } else {
      this.episodeFilters.cast.splice(i, 1);
    }
    this.episodeFilters.cast.sort();
    this.filterHackFrauds();
  }

  hackFraudIsSelected(hackFraud: string) {
    return this.episodeFilters.cast.includes(hackFraud);
  }

  hackFraudIsUnselectable(hackFraud: string) {
    return this.hackFraudsUnselectable.includes(hackFraud);
  }

  filterHackFrauds() {
    let hackFraudsTemp = [];
    // For each episode
    this.Episodes.forEach((episode: any) => {
      let i = 0;
      if (this.arraysIntersect(episode.type, this.episodeFilters.types)) {
        console.log('hello');
        // For each selected hack fraud
        this.episodeFilters.cast.forEach((hackFraud: string) => {
          // If episode has hack fraud
          if (episode.cast.includes(hackFraud)) {
            i++;
          }
        });
        // If all selected hack frauds are in episode
        if (this.episodeFilters.cast.length === i) {
          // Add other hack frauds that are in episode that are not selected to temp array
          hackFraudsTemp = hackFraudsTemp.concat(episode.cast.filter((hackFraud: string) =>
            !hackFraudsTemp.includes(hackFraud)
          ));
        }
      }
    });
    // Uneselectable frauds are all frauds that are not in the temp array
    this.hackFraudsUnselectable = this.hackFrauds.filter((hackFraud: string) =>
      !hackFraudsTemp.includes(hackFraud)
    );
  }

  getEpisodeTypes() {
    return this.episodeTypes;
  }

  selectEpisodeFilter(episodeType: string) {
    const i = this.episodeFilters.types.indexOf(episodeType);
    if (i !== -1) {
      this.episodeFilters.types.splice(i, 1);
    } else {
      this.episodeFilters.types.push(episodeType);
    }
    this.filterHackFrauds();
  }

  episodeTypeIsSelected(episodeType: string) {
    if (this.episodeFilters.types.includes(episodeType) || this.episodeFilters.typeModifiers.includes(episodeType)) {
      return true;
    } else {
      return false;
    }
  }

  resetEpisodeFilters() {
    this.episodeFilters.types = Object.assign([], this.episodeTypes);
  }

  getEpisodes() {
    return this.Episodes;
  }

  reverseEpisodeOrder() {
    this.episodeFilters.reverseOrder = !this.episodeFilters.reverseOrder;
  }

  arraysIntersect(arr1: string[], arr2: string[]) {
    let i = 0;
    arr1.forEach(element => {
      if (arr2.includes(element)) { i++; }
    });
    return i;
  }
}
