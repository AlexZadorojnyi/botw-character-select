import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CharacterSelectComponent } from './character-select/character-select.component';
import { EpisodeFiltersComponent } from './episode-filters/episode-filters.component';
import { EpisodesComponent } from './episodes/episodes.component';

import { SortEpisodesPipe } from './sort-episodes.pipe';
import { ForbiddenCharactersPipe } from './forbidden-characters.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectComponent,
    EpisodeFiltersComponent,
    EpisodesComponent,
    SortEpisodesPipe,
    ForbiddenCharactersPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
