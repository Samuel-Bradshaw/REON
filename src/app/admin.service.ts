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
    return localStorage.getItem(USER_KEY);
  }

  private saveState(): void {
    localStorage.setItem(USER_KEY, this.currentUser);
  }

  setUser(user: string): void {
    this.currentUser = user;
    this.saveState();
  }

  logout(ID: string): void {
    this.currentUser = null;
    this.saveState();
  }

  isLogged(){
  	return localStorage.getItem(USER_KEY) != null;
  }



}