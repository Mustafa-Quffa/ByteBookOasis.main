import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileDropdownService {
  private profileDropdownVisibilitySubject = new BehaviorSubject<boolean>(false);
  profileDropdownVisibility$ = this.profileDropdownVisibilitySubject.asObservable();

  setProfileDropdownVisibility(isVisible: boolean): void {
    this.profileDropdownVisibilitySubject.next(isVisible);
  }
}
