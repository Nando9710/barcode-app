import { Component, EventEmitter, Input, Output, ViewChild, WritableSignal, signal } from '@angular/core';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ProductOptionSearch, ProductParameterData } from '../../../../core/interfaces/product.interface';
import { OptionCode } from '../../../../core/enums/option-code.enum';
import { Observable, debounceTime, map, startWith, tap } from 'rxjs';
import { GoogleProductTaxonomyService } from 'src/app/core/services/google-product-taxonomy/google-product-taxonomy.service';

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
    MatAutocompleteModule,
    UpperCasePipe,
    AsyncPipe
  ],
  templateUrl: './search-form-filter.component.html',
  styleUrl: './search-form-filter.component.scss'
})
export class SearchFormFilterComponent {

  constructor(
    private fb: FormBuilder,
    private productTaxonomyService: GoogleProductTaxonomyService

  ) { }

  productForm!: FormGroup
  public OptionCode: typeof OptionCode = OptionCode;
  public taxonomyData: WritableSignal<string[]> = signal([]);
  public filteredTaxonomyData!: Observable<string[]>;

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

  private filterTaxonomyData(formGroup: FormGroup) {
    this.filteredTaxonomyData = formGroup.controls['value'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }


  private _filter(value: string): string[] {
    return this.taxonomyData().filter(option => option.toLowerCase().includes(value.toLowerCase()));
  }

  public selectCategory(value: string) {
    this.searchProduct.emit(this.prepareData());
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

    const lastIndexArrayFilters = this.getProductFiltersArray().controls.length - 1
    const hola = this.getProductFiltersArray().controls[lastIndexArrayFilters].valueChanges.pipe().subscribe({
      next: () => {
        const group = this.getProductFiltersArray().controls[lastIndexArrayFilters] as FormGroup
        if (group.controls['code'].value === OptionCode.CATEGORY) {
          this.filterTaxonomyData(group);
          hola.unsubscribe();
        };
      }
    })
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

  public productTaxonomyData!: string[]
  private setTaxonomyData() {
    this.productTaxonomyService.productTaxonomyData$.subscribe((data) => {
      if (data) this.taxonomyData.set(data)
      if (!data) this.getTaxonomyData();
    });
  }

  getTaxonomyData(): void {
    if (this.productTaxonomyService.productTaxonomyData$)
      this.productTaxonomyService.getGoogleProductTaxonomyData().subscribe({
        next: (data: string) => {
          // Dividir el contenido en líneas y filtrarlas
          const lines = data.split('\n');
          lines.splice(0, 1)
          // this.taxonomyData.set([...lines]);
          this.productTaxonomyService.setProductTaxonomyData([...lines]);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  ngOnInit(): void {
    this.createProductForm();
    this.addFilterForm();
    this.setTaxonomyData();
  }
}
