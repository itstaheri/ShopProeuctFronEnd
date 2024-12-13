import { Injectable } from '@angular/core';
import { CustomPopupComponent, notificationType } from '../modules/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupComponent!: CustomPopupComponent;

  register(popup: CustomPopupComponent) {
    debugger
    this.popupComponent = popup;
  }

  show(notificationType : number,title: string, message: string) {
    debugger
    this.popupComponent.show(notificationType,title, message);
  }

  close() {
    this.popupComponent.close();
  }
}
