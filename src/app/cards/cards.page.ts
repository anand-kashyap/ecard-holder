import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { SplashScreen} = Plugins;

import { CardsService } from './cards.service';
import { Card } from './card.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit, OnDestroy {
  savedCards: Card[];
  cardsUpdated: Subscription;

  constructor(private cardService: CardsService) { }

  ngOnInit() {
    // this.getCards();
    // this.savedCards = this.cardService.getSavedCards();
    this.cardService.getFromStorage('cards', true).then(val => {
      this.savedCards = val;
      console.log(this.savedCards);
      this.cardsUpdated = this.cardService.getSubject().subscribe(cards => this.savedCards = cards);
      SplashScreen.hide();
      // Hide the splash (you should do this on app launch)
    });

  }

  /* async getCards() {
    let t = await this.cardService.getFromStorage('cards', true);
    console.log(t);
  } */

  ngOnDestroy(): void {
    // this.cardsUpdated.unsubscribe();
  }

}
