import { ValidatorFn, FormGroup } from '@angular/forms';
// validador crossfield 
export const userNamePasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
    const userName: string = formGroup.get('userName').value;
    const password: string = formGroup.get('password').value;
    if (userName.trim() + password.trim()) {
        return userName != password
            ? null // se for null, não tem erro
            : { userNamePassword: true } // se tiver erro, retornar um objeto com o nome da propriedade e com valor true
    } else {
        return null;
    }
}