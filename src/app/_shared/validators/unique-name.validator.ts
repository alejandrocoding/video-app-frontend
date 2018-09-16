import { FormControl } from '@angular/forms';

export const uniqueNameValidator = (collection: Object & { name: string }[]) => {
    return (control: FormControl) => {
        const value: string = control.value.trim().toLowerCase();
        if (!value) {
            return;
        }
        const found = collection.find(item => item.name.trim().toLowerCase() === value);
        return (found) ? { notUnique: true } : null;
    };
};
