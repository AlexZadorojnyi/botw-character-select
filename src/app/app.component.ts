import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'botw-character-select';

  showElement(str: string) {
    const filters = document.getElementById('filters');
    const frauds = document.getElementById('frauds');
    const episodes = document.getElementById('episodes');

    switch (str) {
      case 'filters':
        filters.style.display = 'block';
        frauds.style.display = 'none';
        episodes.style.display = 'none';
        break;
      case 'frauds':
        filters.style.display = 'none';
        frauds.style.display = 'block';
        episodes.style.display = 'none';
        break;
      case 'episodes':
        filters.style.display = 'none';
        frauds.style.display = 'none';
        episodes.style.display = 'block';
        break;
    }
  }
}
