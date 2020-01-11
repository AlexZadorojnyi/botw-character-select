import { Pipe, PipeTransform } from '@angular/core';
import { HackFraudService } from './hack-fraud.service';

@Pipe({
  name: 'sortEpisodesPipe',
  pure: false
})
export class SortEpisodesPipe implements PipeTransform {
  hfService: HackFraudService;

  constructor(hfService: HackFraudService) {
    this.hfService = hfService;
  }

  transform(episodes: Array<any>, args: {
    'cast': string[],
    'types': string[],
    'typeModifiers': string[],
    'reverseOrder': boolean
  }): Array<any> {

    console.log(episodes);

    if (!episodes || episodes === undefined || episodes.length === 0) { return null; }

    if (args.cast.length !== 0) {
      args.cast.forEach((hackFraud: string) =>
        episodes = episodes.filter((episode: { 'cast': string[] }) =>
          episode.cast.includes(hackFraud)
        )
      );
    }

    if (args.types.length < this.hfService.getEpisodeTypes().length) {
      const arrayTemp = [];
      // For each episode
      episodes.forEach(episode => {
        let temp = false;
        // For each episode type
        episode.type.forEach((type: string) => {
          // If type is selected
          if (args.types.includes(type)) {
            temp = true;
          }
        });
        if (temp) {
          arrayTemp.push(episode);
        }
      });
      episodes = arrayTemp.slice();
    }

    if (args.reverseOrder) {
      episodes.reverse();
    }

    return episodes;
  }
}
