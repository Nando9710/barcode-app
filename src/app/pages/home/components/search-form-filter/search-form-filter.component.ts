import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ProductOptionSearch, ProductParameterData } from '../../../../core/interfaces/product.interface';
import { OptionCode } from '../../../../core/enums/option-code.enum';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-form-filter',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    UpperCasePipe,
  ],
  templateUrl: './search-form-filter.component.html',
  styleUrl: './search-form-filter.component.scss'
})
export class SearchFormFilterComponent {

  constructor(private fb: FormBuilder) { }

  productForm!: FormGroup

  @Input() searchOptions!: ProductOptionSearch[];
  @Input() filterOptions!: ProductOptionSearch[];
  @Output() searchProduct: EventEmitter<ProductParameterData[]> = new EventEmitter();
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  private createProductForm() {
    this.productForm = this.fb.group({
      code: [OptionCode.TITLE],
      value: [''],
      filters: this.fb.array([])
    });

    setTimeout(() => {
      this.subscribeToFormChange();
    }, 0);
  }

  private subscribeToFormChange() {
    this.productForm.controls['value'].valueChanges.pipe(debounceTime(500)).subscribe({
      next: () => {

        this.searchProduct.emit(this.prepareData());
      }
    })
  }

  public getProductFiltersArray(): FormArray {
    return this.productForm.controls['filters'] as FormArray
  }
  public addFilterForm() {
    const productFilters = this.getProductFiltersArray();
    productFilters.push(
      this.fb.group({
        code: [OptionCode.BRAND],
        value: ['']
      })
    )
  }

  public deleteFilterForm(i: number) {
    const productFilters = this.getProductFiltersArray();
    productFilters.removeAt(i)
  }

  public filter() {
    this.searchProduct.emit(this.prepareData());
    this.closeMenu();
  }

  public closeMenu() {
    this.menuTrigger.closeMenu()
  }

  public prepareData(): ProductParameterData[] {
    const product: ProductParameterData[] = [
      {
        code: this.productForm.controls['code'].value,
        value: this.productForm.controls['value'].value,
      },
      ...this.productForm.controls['filters'].value
    ];
    return product
  }

  ngOnInit(): void {
    this.createProductForm();
    this.addFilterForm();
  }
}
