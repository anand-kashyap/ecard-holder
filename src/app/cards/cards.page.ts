import { Component, OnInit } from '@angular/core';

import { CardsService } from './cards.service';
import { Card } from './card.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  savedCards: Card[];
  cardsUpdated: Subscription;

  constructor(private cardService: CardsService) { }

  ngOnInit() {
    this.savedCards = this.cardService.getSavedCards();
    this.cardsUpdated = this.cardService.getSubject().subscribe(cards => this.savedCards = cards);
  }

}
