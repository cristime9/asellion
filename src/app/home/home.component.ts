import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { products } from '../products';

import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    products = products;
    currentUser: any;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}