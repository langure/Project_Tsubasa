import { AbstractControl, ValidationErrors } from '@angular/forms';

/** 
 * This method is no longer being used, as I moved into a passwordless login,
 * but I'm keeping it here for reference.
 */
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    if (control.value && !passwordRegex.test(control.value)) {
        return { invalidPassword: true };
    }

    return null;
}
