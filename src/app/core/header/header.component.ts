import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    user$: Observable<User>  // Boas práticas declarar com $ no final para Observables
    // passando o Observable para o template usar o pipe async (muito melhor por causa do destroy automático)
    

    constructor(private userService: UserService, private router: Router) {
        this.user$ = userService.getUser();
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }
}