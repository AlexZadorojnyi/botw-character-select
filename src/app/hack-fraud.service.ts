import { Injectable } from '@angular/core';
import episodes from '../assets/episodes.json';

@Injectable({
  providedIn: 'root'
})
export class HackFraudService {

  Episodes: any = episodes;
  private episodesSelected = [];

  private episodeTypes = [
    'Best of the Worst', 'Wheel of the Worst', 'Plinketto',
    'Spotlight Episode', 'Black Spine Edition', 'Battle of the Genres',
    'Christmas Special', 'Halloween Special'
  ];

  private episodeFilters = {
    cast: [],
    types: [],
    typeModifiers: [],
    reverseOrder: false
  };

  private hackFraudsUnselectable = [];
  private hackFrauds = [
    'Mike', 'Jay', 'Rich',
    'Jack', 'Josh', 'Jessi',
    'Colin', 'Jim', 'Mack',
    'Freddie', 'Tim', 'Len',
    'Simon', 'Shawn', 'Patton',
    'Max', 'Gillian'
  ];

  constructor() {
    this.episodeFilters.types = Object.assign([], this.episodeTypes);
  }

  /* EPISODES */

  // Returns an array of all episodes loaded in from the .json file
  getEpisodes() {
    return this.Episodes;
  }

  selectEpisode(episodeNumber: number) {
    const i = this.episodesSelected.indexOf(episodeNumber);
    if (i === -1) {
      this.episodesSelected.push(episodeNumber);
    } else {
      this.episodesSelected.splice(i, 1);
    }
  }

  episodeIsSelected(episodeNumber: number) {
    return this.episodesSelected.includes(episodeNumber);
  }

  /* EPISODE TYPES */

  // Returns an array of all episode types
  getEpisodeTypes() {
    return this.episodeTypes;
  }

  /* EPISODE FILTERS */

  // Returns an array of all episode filters
  getEpisodeFilters() {
    return this.episodeFilters;
  }

  // Selects/deselects episode filter
  selectEpisodeFilter(episodeType: string) {
    const i = this.episodeFilters.types.indexOf(episodeType);
    // If episode filter is selected
    if (i !== -1) {
      // Select episode filter
      this.episodeFilters.types.splice(i, 1);
    // If episode filter is not selected
    } else {
      // Deselect episode filter
      this.episodeFilters.types.push(episodeType);
    }
    this.filterHackFrauds();
  }

  // Returns whether an episdoe filter is selected or not
  episodeFilterIsSelected(episodeType: string) {
    return this.episodeFilters.types.includes(episodeType);
  }

  // Resets episode filters
  resetEpisodeFilters() {
    this.episodeFilters.types = Object.assign([], this.episodeTypes);
  }

  // Toggles the order of episodes
  reverseEpisodeOrder() {
    this.episodeFilters.reverseOrder = !this.episodeFilters.reverseOrder;
  }

  /* HACK FRAUDS */

  // Returns an array of all hack frauds
  getHackFrauds() {
    return this.hackFrauds.slice();
  }

  // Returns an array of all selected hack frauds
  getHackFraudsSelected() {
    return this.episodeFilters.cast.slice();
  }

  // Returns whether or not a hack fraud is selected
  hackFraudIsSelected(hackFraud: string) {
    return this.episodeFilters.cast.includes(hackFraud);
  }

  // Returns whether or not a hack fraud is unselectable
  hackFraudIsUnselectable(hackFraud: string) {
    return this.hackFraudsUnselectable.includes(hackFraud);
  }

  // Selects/deselects hack fraud
  selectHackFraud(hackFraud: string) {
    const i = this.episodeFilters.cast.indexOf(hackFraud);
    // If hack fraud is not selected
    if (i === -1) {
      // If hack fraud is not unselectable
      if (!this.hackFraudsUnselectable.includes(hackFraud)) {
        // Select hack fraud
        this.episodeFilters.cast.push(hackFraud);
      }
    // If hack fraud is selected
    } else {
      // Deselect hack fraud
      this.episodeFilters.cast.splice(i, 1);
    }
    this.episodeFilters.cast.sort();
    this.filterHackFrauds();
  }

  // Updates array of unselectable hack frauds based on selected hack frauds and available episodes
  filterHackFrauds() {
    let hackFraudsTemp = [];
    // For each episode
    this.Episodes.forEach((episode: any) => {
      let i = 0;
      if (this.arraysIntersect(episode.type, this.episodeFilters.types)) {
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

  /* OTHER */

  // Returns the number of elements two arrays share
  arraysIntersect(arr1: string[], arr2: string[]) {
    let i = 0;
    arr1.forEach(element => {
      if (arr2.includes(element)) { i++; }
    });
    return i;
  }
}
