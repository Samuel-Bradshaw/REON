import { Injectable } from '@angular/core';

const USER_KEY = "admin_key";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

	private currentUser: string;

    constructor() {
    this.currentUser = this.loadState();
  }

  private loadState(): string {
    return sessionStorage.getItem(USER_KEY);
  }

  private saveState(): void {
    sessionStorage.setItem(USER_KEY, this.currentUser);
  }

  setUser(user: string): void {
    this.currentUser = user;
    this.saveState();
  }

  logout(): void {
    this.currentUser = null;
    this.saveState();
    sessionStorage.clear();
  }

  isLogged(): boolean{
    let logged = sessionStorage.getItem(USER_KEY) != null;
  	return logged;
  }



}
