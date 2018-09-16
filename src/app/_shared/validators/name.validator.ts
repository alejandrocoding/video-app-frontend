import { FormControl } from '@angular/forms';

export function nameValidator(control: FormControl) {

  const value: string = control.value;
  if (!value) {
    return;
  }
  const isValid = /^([\sa-zA-Z0-9*+#_-](?![.])){3,50}$/i.test(value);
  return (isValid) ? null : { name: true };
}
