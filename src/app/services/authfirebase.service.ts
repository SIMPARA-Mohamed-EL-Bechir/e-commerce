
import { inject, Injectable, signal } from '@angular/core';
import { Auth, fetchSignInMethodsForEmail, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User as FirebaseUser } from 'firebase/auth';
import { from, Observable, of, BehaviorSubject, map } from 'rxjs';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthfirebaseService {

  constructor() { }

  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<UserInterface| null | undefined>(undefined)
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();



  register(email: string, username: string, password: string): Observable<void>{
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then(response => updateProfile(response.user, {displayName: username}))

    return from(promise);
  }

  login(
    email: string, 
    password: 
    string
  ): Observable<void>{
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email, 
      password
    ).then(()=>{})

    return from(promise);
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth);
  }

  getCurrentUserId(): Observable<string | null> {
    return this.user$.pipe(
      map((user: FirebaseUser | null) => (user ? user.uid : null))
    );
  }

  isEmailInUse(email: string): Observable<boolean> {
    const promise = fetchSignInMethodsForEmail(this.firebaseAuth, email)
      .then(methods => methods.length > 0);
    return from(promise);
  }
  
}
