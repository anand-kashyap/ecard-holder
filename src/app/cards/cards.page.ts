import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

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
    this.savedCards = this.cardService.getSavedCards();
    this.cardsUpdated = this.cardService.getSubject().subscribe(cards => this.savedCards = cards);
    // Hide the splash (you should do this on app launch)
    SplashScreen.hide();

  }

  ngOnDestroy(): void {
    this.cardsUpdated.unsubscribe();
  }

}
