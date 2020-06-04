import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(
        router: Router
    ) {
        router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                if(this.keepAfterRouterChange) {
                    this.keepAfterRouterChange = false; // fazer nada
                } else {
                    this.clear();
                }
            }
        })
    }

    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouterChange = false;

    success(message: string, keepAfterRouterChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterRouterChange);
    }

    warning(message: string, keepAfterRouterChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouterChange);
    }

    danger(message: string, keepAfterRouterChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouterChange);
    }

    info(message: string, keepAfterRouterChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterRouterChange);
    }

    private alert(AlertType: AlertType, message: string, keepAfterRouterChange: boolean = false) {
        this.keepAfterRouterChange = keepAfterRouterChange;
        this.alertSubject.next(new Alert(AlertType, message));
    }

    getAlert() {
        return this.alertSubject.asObservable();
    }

    clear() {
        this.alertSubject.next(null);
    }
}