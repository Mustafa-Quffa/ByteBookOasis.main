// footer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private footerVisibilitySubject = new BehaviorSubject<boolean>(true);
  footerVisibility$ = this.footerVisibilitySubject.asObservable();

  setFooterVisibility(isVisible: boolean): void {
    this.footerVisibilitySubject.next(isVisible);
  }
}
