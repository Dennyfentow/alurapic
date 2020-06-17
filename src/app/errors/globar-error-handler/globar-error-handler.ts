import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    // uso esse injector pra injetar sempre depois do erro ser gerado, não antes do erro ser gerado, como é feito no constructor
    constructor(private injector: Injector) { }

    handleError(error: any): void {
        console.log('passei pelo handler');

        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        const url = location instanceof PathLocationStrategy // Path que o usuário está acessando no momento
            ? location.path()
            : '';

        const message = error.message
            ? error.message :
            error.toString();

        if(environment.production) router.navigate(['/error']);

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(st => st.toString())
                    .join('\n');

                console.log(message);
                console.log(stackAsString);
                console.log('o que será enviado para o servidor: ')
                serverLogService.log({ // Enviar para o backEnd
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString
                }).subscribe(
                    () => console.log('Error logged on server'),
                    err => console.log('Fail to send error log to server')
                )

            });
    }
}