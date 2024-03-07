import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../types';
import { Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder : FormBuilder){}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>()
  @Input() header: string = '';

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  @Output() confirm = new EventEmitter<Product>();

  specialCharatcterValidator(): ValidatorFn{
    return (control)=>{
        const hasSpecialCharacter = /[!@#%$^()_+-=\[\]{};':"\\],.<>?\/?]+/.test(
          control.value
        );
        return hasSpecialCharacter ? {hasSpecialCharacter:true} :null;
    };
  }

  productForm = this.formBuilder.group({
    name : ['',[Validators.required, this.specialCharatcterValidator()]],
    image : [''],
    price : ['',[Validators.required ]],
    rating : [0],
  })

  ngOnChanges()
  {
      this.productForm.patchValue(this.product)
  }

  onConfirm() {
    const {name, image , price , rating} =this.productForm.value;

    this.confirm.emit({
      name : name || '',
      image : image || '',
      price : price || '',
      rating : rating || 0
    });
    this.display = false
    this.displayChange.emit(this.display)
  }
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display)
  }
}
