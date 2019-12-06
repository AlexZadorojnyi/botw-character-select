import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterSelectComponent } from './character-select/character-select.component';
import { EpisodeFiltersComponent } from './episode-filters/episode-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectComponent,
    EpisodeFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
