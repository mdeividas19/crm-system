import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { ClientsService } from '../../../services/clients-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-client.html',
  styleUrl: './new-client.css',
})
export class NewClient {
  
  public newClientForm:FormGroup;
  public isLoading = false;
  public isError = false;
  public isSuccess = false;
  public errorMessage = "";
  
  constructor(private clientsService:ClientsService, private router:Router){
    this.newClientForm = new FormGroup({
      'company_name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'company_code': new FormControl(null, [this.validateCompanyCode]),
      'vat_code': new FormControl(null, [this.validateVATCode]),
      'address': new FormControl(null),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone_number': new FormControl(null, [this.validatePhoneNumber, Validators.minLength(10), Validators.maxLength(12)]),
      'contacts':new FormArray([
        new FormGroup({
          'first_name': new FormControl(null, [Validators.required]),
          'last_name': new FormControl(null, [Validators.required]),
          'position': new FormControl(null),
          'phone_number': new FormControl(null, [this.validatePhoneNumber, Validators.minLength(10), Validators.maxLength(12)])
        })
      ])
    });

  }

  public submitForm() {
    this.isLoading = true;
    this.isError = false;
    this.isSuccess = false;
    this.clientsService.addItem(this.newClientForm.value).subscribe({
      next:()=>{
        this.isLoading = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1500);
      },
      error:()=>{
        this.isError = true;
        this.isLoading = false;
        this.errorMessage = "Error occured while data was being uploaded"
      }
    });
    console.log("OK");
    console.log("Save data");
    console.log(this.newClientForm.value);
    console.log(this.newClientForm.valid);
  }

  get contacts(){
    return (this.newClientForm.get('contacts') as FormArray).controls;
  }

  private validateCompanyCode(control:AbstractControl): ValidationErrors | null {
    if (/^[0-9]*$/.test(control.value) || !control.value) {
      return null;
    }
    return {error:"Invalid company code"};
  }

  private validateVATCode(control:AbstractControl): ValidationErrors | null {
    if (!control.value) { return null; }
    let temp = control.value;
    if (temp.startsWith('LT')) {
      temp = temp.slice(2);
    }
    if (/^[0-9]*$/.test(temp)) {
      return null;
    }
    return {error:"Invalid VAT code"};
  }

  private validatePhoneNumber(control:AbstractControl): ValidationErrors | null {
    if (!control.value) { return null; }
    if (/^\+370[0-9]{8}$/.test(control.value)) {
      return null;
    }
    return {error:"Invalid phone number"};
  }

  public addContact() {
    (this.newClientForm.get('contacts') as FormArray).push(
        new FormGroup({
          'first_name': new FormControl(null, [Validators.required]),
          'last_name': new FormControl(null, [Validators.required]),
          'position': new FormControl(null),
          'phone_number': new FormControl(null, [this.validatePhoneNumber, Validators.minLength(10), Validators.maxLength(12)])
        })
    );
  }

  public removeContact(index: number){
    (this.newClientForm.get('contacts') as FormArray).removeAt(index);
  }

}
