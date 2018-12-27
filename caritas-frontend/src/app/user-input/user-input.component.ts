import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Sex } from '../models/sex.model';
import { DropdownService } from '../services/dropdown.service';
import { Observable } from 'rxjs';
import { Behaviour } from '../models/behaviour.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  id = 1;
  surname = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  username = new FormControl();
  email = new FormControl('');
  birthday = new FormControl('');
  sex = new FormControl('');
  behaviour = new FormControl('');
  postalCode = new FormControl('');
  OIB = new FormControl('');

  sexes: Sex[];
  behaviours: Behaviour[];
  filteredSexes: Observable<Sex[]>;

  constructor(private userService: UserService, private dropdownService: DropdownService,public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.dropdownService.getAllSexes().subscribe(sex => {
      this.sexes = sex;
    });

    this.dropdownService.getAllBehaviours().subscribe(behaviour => {
      this.behaviours = behaviour;
    });

  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }
  getErrorMessage() {
    return this.surname.hasError('required') ? 'You must enter a last name' : '';
  }

  insertUser() {
    console.log('insert initiated');
    if (this.name.valid && this.surname.valid && this.OIB.valid && this.email.valid && this.birthday.valid && this.behaviour.valid && this.postalCode.valid && this.sex.valid && this.username.valid) {
      let user = new User(null, this.username.value, this.name.value, this.surname.value,
        this.OIB.value, this.email.value, this.postalCode.value, this.birthday.value,
        this.sexes.find(option => option.name === this.sex.value), 
        this.behaviours.find(option => option.name === this.behaviour.value))
      
      this.userService.insertUser(user).subscribe(response => 
        response ? this.snackBar.open('Uspješno dodan korisnik.', 'Zatvori', {duration: 2000, panelClass: ['snackbar-added']},) : this.snackBar.open('nespješno dodan korisnik.'))
    }
    // console.log(this.name.valid);
    // console.log(this.surname.valid);
    // console.log(this.OIB.valid);
    // console.log(this.email.valid);
    // console.log(this.birthday.valid);
    // console.log(this.postalCode.valid);
    // console.log(this.username.valid);
    // console.log(this.sex.valid);
    // console.log(this.behaviour.valid);

  }


}
