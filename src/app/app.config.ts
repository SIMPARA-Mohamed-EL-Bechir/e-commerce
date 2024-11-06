import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';  
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';  
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { 
  Firestore,
  provideFirestore,
  getFirestore
} from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkecOz2KlVq8qNrW3925ADfTgZLHym9ro",
  authDomain: "authentification-7ad14.firebaseapp.com",
  projectId: "authentification-7ad14",
  storageBucket: "authentification-7ad14.appspot.com",
  messagingSenderId: "1085977285163",
  appId: "1:1085977285163:web:aaca7eef49ef071f88106e"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(), 
    ProductService,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    importProvidersFrom(FormsModule),
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    importProvidersFrom(AngularFireAuthModule),
    provideFirestore(() => getFirestore()), // Correctly providing Firestore
    AngularFireAuth // This may not be necessary if you're already using provideAuth
  ]
}