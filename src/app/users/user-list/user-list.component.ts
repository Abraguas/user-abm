import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  private subscription = new Subscription();
  constructor(private userService: UserService, private router: Router) { }
  
 
  ngOnInit(): void {
    this.updateList();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  updateList(): void {
    const result = this.userService.getUsers().subscribe({
      next: (result: User[]) => {
        this.users = result
      },
      error: (e) => {console.error(e)},


    })
    this.subscription.add(result);
  }
  editUser(u: User): void {
    this.router.navigate(['form',u.id])
  }

}
