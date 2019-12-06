import { Injectable } from '@angular/core';
import episodes from '../assets/episodes.json';

@Injectable({
  providedIn: 'root'
})
export class HackFraudService {

  Episodes: any = episodes;
  private episodesAvailable = this.Episodes.slice();

  private hackFrauds = [
    'Mike', 'Jay', 'Rich',
    'Jack', 'Josh', 'Jessi',
    'Colin', 'Jim', 'Mack',
    'Freddie', 'Tim', 'Len',
    'Simon', 'Shawn', 'Patton',
    'Max', 'Gillian'
  ];
  private hackFraudsSelected = [];
  private hackFraudsUnselectable = [];

  constructor() { }

  getHackFrauds() {
    return this.hackFrauds.slice();
  }

  getHackFraudsSelected() {
    return this.hackFraudsSelected.slice();
  }

  selectHackFraud(hackFraud: string) {
    const i = this.hackFraudsSelected.indexOf(hackFraud);
    if (i !== -1) {
      this.hackFraudsSelected.splice(i, 1);
    } else {
      this.hackFraudsSelected.push(hackFraud);
    }
    this.hackFraudsSelected.sort();
    // console.log(this.hackFraudsSelected);
    // console.log(this.Episodes);
    this.filterEpisodes();
    this.filterHackFrauds();
  }

  hackFraudIsSelected(hackFraud: string) {
    return this.hackFraudsSelected.indexOf(hackFraud) !== -1;
  }

  hackFraudIsUnselectable(hackFraud: string) {
    return this.hackFraudsUnselectable.includes(hackFraud);
  }

  filterHackFrauds() {
    let hackFraudsTemp = this.hackFraudsSelected;
    this.episodesAvailable.forEach(episode => {
      let i = 0;
      this.hackFraudsSelected.forEach(hackFraud => {
        if (episode.cast.indexOf(hackFraud) !== -1) {
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

  getEpisodesAvailable() {
    return this.episodesAvailable;
  }

  filterEpisodes() {
    let episodesTemp = this.Episodes.slice();
    this.hackFraudsSelected.forEach(hackFraud =>
      episodesTemp = episodesTemp.filter(
        episode => episode.cast.indexOf(hackFraud) !== -1
      ));
    console.log(episodesTemp);
    this.episodesAvailable = episodesTemp;
  }
}
