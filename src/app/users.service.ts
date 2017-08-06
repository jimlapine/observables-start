import { Subject } from 'rxjs/Subject';

export class UsersService {
  // Subjects are an observer and observable all in one
  // It's a good idea to use subjects instead of emitters
  // Since this is not a built in angular observable, make sure to unsubscribe from it, where you use it
  userActivated = new Subject()
}
