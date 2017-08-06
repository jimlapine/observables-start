import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx'; // Import for Interval

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberSubscription: Subscription;
  observableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const numbers = Observable.interval(1000); // This observable with trigger every second.

    this.numberSubscription = numbers.subscribe(
      (number: number) => {
        console.log(`number: ${number}`);
      }
    );

    const observable = Observable.create(
      // Your asynchronous code
      (observer: Observer<string>) => {
        // First string triggers every 2 seconds
        setInterval(() => {
            observer.next('first package');
          }, 2000);
        // 2nd string triggers every 4 seconds
        setInterval(() => {
            observer.next('second package');
          }, 4000);
        // Fails after 5 seconds
        // setInterval(() => {
        //     observer.error('This does not work');
        //   }, 5000);
        setInterval(() => {
            observer.complete();
          }, 5000);
        setInterval(() => {
            observer.next('does this work');
          }, 6000);
      });

    this.observableSubscription = observable.subscribe(
      (data: string) => { console.log(`data: ${data}`); },
      (error: string) => { console.log(`error: ${error}`); },
      () => { console.log(`completed`); },
    );
  }

  ngOnDestroy() {
    this.numberSubscription.unsubscribe();
    this.observableSubscription.unsubscribe();
  }
}
