
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() onDelete = new EventEmitter();
  private subscription = new Subscription();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  deleteUser(): void {
    if(confirm("Are you sure you want to delete this user?")){
      this.subscription.add(
        this.userService.deleteUser(this.user.id).subscribe({
          next: () => {
            this.onDelete.emit();
          },
          error: (e) => { console.error(e) }
        })
      )
    }

    

  }
}
