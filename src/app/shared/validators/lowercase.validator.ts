import { AbstractControl } from '@angular/forms';

export function LowerCaseValidator(control: AbstractControl) {

    // Se houver espaço em branco e se não for minúsculo ou começar com número, não validado, retornar Object ae
    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true} // este nome precisa ser o mesmo no template
    }
    return null;
}