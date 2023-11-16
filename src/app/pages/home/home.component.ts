import { Component } from '@angular/core';
import { RequestBarcodeApiService } from '../../core/services/request-barcode-api/request-barcode-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { UpperCasePipe } from '@angular/common';
import { ProductOptionSearch, ProductParameterData } from '../../core/interfaces/product.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    UpperCasePipe
  ],
  providers: [RequestBarcodeApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private barcodeService: RequestBarcodeApiService,
    private fb: FormBuilder
  ) { }


  public searchOptions: ProductOptionSearch[] = [
    { code: 'barcode', name: 'BARCODE' },
    { code: 'mpn', name: 'MPN' },
    { code: 'asin', name: 'ASIN' },
    { code: 'title', name: 'Nombre' },
    { code: 'category', name: 'Categoría' },
    { code: 'manufacturer', name: 'Fabricante' },
    { code: 'brand', name: 'Marca' },
    { code: 'geo', name: 'País' },
  ]

  productForm: FormGroup = this.fb.group({
    code: ['title'],
    value: [''],
    filters: this.fb.array([])
  })

  private subscribeToTitleChange() {
    this.productForm.controls['value'].valueChanges.pipe(debounceTime(500)).subscribe({
      next: (strValue) => {
        console.log(strValue);
        this.searchProduct(strValue)
      }
    })
  }

  private searchProduct(value: string) {
    const product: ProductParameterData[] = [{
      code: this.productForm.controls['code'].value,
      value: this.productForm.controls['value'].value
    }]
    this.barcodeService.getProducts(product).subscribe(({ products }) => {
      console.log(products);
    })
  }

  ngOnInit(): void {
    this.subscribeToTitleChange()
  }
}
