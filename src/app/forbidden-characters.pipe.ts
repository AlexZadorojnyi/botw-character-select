import { Pipe, PipeTransform } from '@angular/core';
import { HackFraudService } from './hack-fraud.service';

@Pipe({
  name: 'forbiddenCharactersPipe',
  pure: false
})
export class ForbiddenCharactersPipe implements PipeTransform {

  constructor(hfService: HackFraudService) {}

  transform(title: string): string {

    while (title.includes('/'))  { title = title.replace('/', '_'); }
    while (title.includes('\\')) { title = title.replace('\\', '_'); }
    while (title.includes(':'))  { title = title.replace(':', '_'); }
    while (title.includes('*'))  { title = title.replace('*', '_'); }
    while (title.includes('?'))  { title = title.replace('?', '_'); }
    while (title.includes('"'))  { title = title.replace('"', '_'); }
    while (title.includes('<'))  { title = title.replace('<', '_'); }
    while (title.includes('>'))  { title = title.replace('>', '_'); }
    while (title.includes('|'))  { title = title.replace('|', '_'); }
    return title;
  }
}
