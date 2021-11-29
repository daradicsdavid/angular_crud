import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: User[];
  selectedUser: User | undefined;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users
    }, error => {
      console.log(error)
    })
  }


  showEditUserForm(user: User) {
    this.selectedUser = user;
  }

  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.selectedUser = {
        //A new user do not have an id yet, that is how we designate it as new as opposed to an existing user that we will edit. (that is important at the isEdit() function)
        id: undefined,
        firstName: '',
        lastName: ''
      };
    }
  }

  saveUser() {
    if (this.isEdit()) {
      this.userService.updateUser(this.selectedUser).subscribe(editedUser => {
        this.users = this.users.map(user => user.id === editedUser.id ? editedUser : user)
        //This code is working the same way as the code above it. We are mapping every user in the user array to a new array, and if we find the edited user by id, we replace it with the edited user.
        // const users = []
        // for (let index = 0; index < this.users.length; index++) {
        //   const element = this.users[index];
        //   if (this.users[index].id === editedUser.id) {
        //     users.push(editedUser)
        //   } else {
        //     users.push(this.users[index].id)
        //   }
        // }
        // this.users = users

        this.selectedUser = undefined;
      });
    } else {
      this.userService.addUser(this.selectedUser).subscribe(newUser => {
        this.users.push(newUser)
        this.selectedUser = undefined; //We need to set selectedUser to undefined once we are finished, otherwise the form for the user stays on the screen, (try deleting this line, actually try deleting any line if you don't understand why it is needed, and observe how the program breaks.) 
      });
    }
  }

  removeUser(deletedUser: User) {
    this.userService.deleteUser(deletedUser).subscribe(() => {
      this.users = this.users.filter(user => user.id !== deletedUser.id)
        //This code is working the same way as the code above it. We are filtering every user, and if we find one with the same id as the deleted user id, we skip it.
        // const users = []
        // for (let index = 0; index < this.users.length; index++) {
        //   const element = this.users[index];
        //   if (this.users[index].id !== deletedUser.id) {
        //     users.push(this.users[index].id )
        //   }
        // }
        // this.users = users
    });
  }

  cancel() {
    this.selectedUser = undefined;
  }

  isEdit() {
    return this.users.find(user => user.id === this.selectedUser.id)
        //This code is working the same way as the code above it. We are trying to find a user by it's id, if we find it we return it, if we don't find it we return undefined.
        //Undefined is a special value which is false in javascript, while every object is true, so this function returns true if we have a user with the selected user id, false otherwise.
        //If we have a user which is not in the users array, it means that it is a new user, so isEdit() returns false. If it is present, it returns true.
        // let foundUser = undefined 
        // for (let index = 0; index < this.users.length; index++) {
        //   const element = this.users[index];
        //   if (this.users[index].id === this.selectedUser.id) {
        //     foundUser=this.users[index]
        //   }
        // }
        // return foundUser
  }
}
