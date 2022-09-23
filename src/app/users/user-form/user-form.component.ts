import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  isSaving = false;
  isUpdating = false;
  isEdit: boolean;
  user: User;
  idParam: number;
  @ViewChild("userForm") userForm: NgForm;
  private subscription = new Subscription();
  


  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.user = new User();
    this.activatedRoute.params.subscribe({
      next: (params)=>{
        this.idParam  = params['id'];
        if(this.idParam){
          this.isEdit = true;
          this.loadUser();
        }
        else{
          this.isEdit = false;
        }
      }
    })
  }
  saveUser(): void {
    if (!this.userForm.valid) {
      alert("Error: fields");
      return
    }
    this.isSaving = true;
    this.subscription.add(
      
      this.userService.registerUser(this.user).subscribe({
        next: () => {
          alert("Success");
          this.user = new User();
          this.router.navigate(['list']);
        },
        error: (e) => {console.error(e)}
      })
    )
    
    
  }
  editUser(): void{
    this.isUpdating = true;
    this.subscription.add(
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          alert("Success");
          this.user = new User();
          this.router.navigate(['list']);
        },
        error: (e) => {console.error(e)}
      })
    )
  }
  cancel(): void {
    this.router.navigate(['list']);
  }
  private loadUser(): void {
    this.subscription.add(
      this.userService.getById(this.idParam).subscribe({
        next: (u: User) => {
          this.user = u;
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }

}
