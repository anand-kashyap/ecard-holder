import { Injectable } from '@angular/core';
import { Card } from './card.models';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private savedCards: Card[] = [
    {
      cardId: 1,
      cardNumber: 1234567890123456,
      expiryDate: '03/23',
      cvv: 123,
      holderName: 'Test Holder',
      cardNickName: 'First Test Card'
    },
    {
      cardId: 2,
      cardNumber: 4234567890123456,
      expiryDate: '11/21',
      cvv: 323,
      holderName: 'Second Test Holder',
      cardNickName: 'Second Test Card'
    },
  ];

  savedCardsLive = new Subject<Card[]>();

  constructor(private toastController: ToastController) { }

  getSavedCards(): Card[] {
    return [...this.savedCards];
  }

  addCard(newCard: Card): Card[] {
    this.savedCards.push(newCard);
    this.savedCardsLive.next([...this.savedCards]);
    return [...this.savedCards];
  }

  getSubject() {
    return this.savedCardsLive.asObservable();
  }

  getCardDetail(cardId: number) {
    return {...this.savedCards.find(c => c.cardId === cardId)};
  }

  copyToClipboard(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  showToast() {
    this.toastController.create({
      message: 'Copied!',
      position: 'bottom',
      duration: 1000,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(toast => toast.present());
  }

  getValidationErrors(formControl: string, formGroup, validations): string {
    const errorField = validations[formControl];

    for (const i in errorField) {
      if (formGroup.get(formControl).hasError(errorField[i].type)) {
        return errorField[i].message;
      }
    }
  }

  // Method to mark all form fields as dirty
  markFieldsAsDirty(formGroup) {
    Object.keys(formGroup.controls).forEach(formControl => {
      const control = formGroup.get(formControl);
      control.markAsDirty({ onlySelf: true });
    });
  }

}
