import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  user1Activated = false;
  user2Activated = false;
  userActivatedSubscription: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    // It's a good idea to use subjects instead of emitters
    this.usersService.userActivated.subscribe(
      (id: number) => {
        if (id === 1) {
          this.user1Activated = true;
          // this.user2Activated = false;
        } else {
          // this.user1Activated = false;
          this.user2Activated = true;
        }
      }
    );
  }

  ngOnDestroy() {
    // Since this is not a built in angular observable, make sure to unsubscribe.
    this.userActivatedSubscription.unsubscribe();
  }
}
