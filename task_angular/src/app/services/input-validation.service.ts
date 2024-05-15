import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor() { }
  isFieldInvalid(field: string, data: any, isFormSubmitted: boolean) {
    return data.get(field)?.invalid && (data.get(field)?.touched || data.get(field)?.dirty || isFormSubmitted)
  }


  getErrorMessage(data: any, field: string, label: string) {
    if (data.get(field)?.hasError("required")) return `${label} is required`;
    if (data.get(field)?.hasError("minlength")) return `${label} should be at least ${data.get(field)?.getError("minlength").requiredLength} characters`;
    if (data.get(field)?.hasError("maxlength")) return `${label} should be at most ${data.get(field)?.getError("maxlength").requiredLength} characters`;
    if (data.get(field)?.hasError("pattern")) return `${label} is invalid`;
    return '';
  }

}
