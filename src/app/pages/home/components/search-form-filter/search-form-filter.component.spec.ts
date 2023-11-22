import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormFilterComponent } from './search-form-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OptionCode } from 'src/app/core/enums/option-code.enum';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ProductParameterData } from 'src/app/core/interfaces/product.interface';
import { first } from 'rxjs';

describe('SearchFormFilterComponent', () => {
  let component: SearchFormFilterComponent;
  let fixture: ComponentFixture<SearchFormFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormFilterComponent, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchFormFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('values should has form', () => {
    const code = component.productForm.controls['code'].value
    const value = component.productForm.controls['value'].value
    const filters = component.productForm.controls['filters'].value

    expect(code).toBe(OptionCode.TITLE)
    expect(value).toBeFalsy()
    expect(filters.length).toBe(1)
  })

  it('should return the formArray control getProductFiltersArray()', () => {
    expect(component.getProductFiltersArray() as FormArray).toBe(component.productForm.controls['filters'] as FormArray)
  })

  it('should return a ProductParameterData prepareData()', () => {
    component.productForm.controls['code'].setValue(OptionCode.BRAND);
    component.productForm.controls['value'].setValue('Apple');

    const expectedValueData = [
      {
        code: OptionCode.BRAND,
        value: 'Apple',
      },
      {
        code: OptionCode.BRAND,
        value: '',
      },
    ]
    expect(component.prepareData()).toEqual(expectedValueData);
  })

  it('should add a formgroup to the filters array getProductFiltersArray()', () => {
    expect(component.getProductFiltersArray().length).toBe(1)
    component.addFilterForm()
    expect(component.getProductFiltersArray().length).toBe(2)
  })

  it('should delete a formgroup to the filters array getProductFiltersArray()', () => {
    expect(component.getProductFiltersArray().length).toBe(1)
    component.deleteFilterForm(0)
    expect(component.getProductFiltersArray().length).toBe(0)
  })

  it('should change filters array value', () => {
    component.addFilterForm();

    const firstFormGroup = component.getProductFiltersArray().at(0) as FormGroup
    const secondFormGroup = component.getProductFiltersArray().at(1) as FormGroup

    firstFormGroup.patchValue({
      code: OptionCode.MANUFACTURER,
      value: 'Samsung'
    });

    secondFormGroup.patchValue({
      code: OptionCode.GEO,
      value: 'us'
    });

    const expectedValueData = [
      {
        code: OptionCode.TITLE,
        value: '',
      },
      {
        code: OptionCode.MANUFACTURER,
        value: 'Samsung',
      },
      {
        code: OptionCode.GEO,
        value: 'us',
      },
    ]

    expect(component.prepareData()).toEqual(expectedValueData);
  })

  it('filterIncludesTaxonomyData(value: string) should return filtered array', () => {
    component.taxonomyData.set(['Animals', 'Electronic']);
    const filtered = component.filterIncludesTaxonomyData('elec');
    expect(filtered).toEqual(['Electronic']);
  })

  it('when "code" is CATEGORY taxonomyData is filtered (Observable)', () => {
    component.createProductForm();
    component.addFilterForm();
    component.taxonomyData.set(['Animals', 'Electronic']);

    const group = component.getProductFiltersArray().controls[0] as FormGroup;
    group.controls['code'].setValue(OptionCode.CATEGORY);
    group.controls['value'].setValue('elec');

    fixture.whenStable().then(() => {
      component.filteredTaxonomyData.subscribe(data => {
        expect(data).toEqual(['Electronic']);
      })
    });
  })

  it('should raise selected event when type on value input form subscribeToFormChange()', () => {
    component.ngOnInit()
    let preparedDataTyped: ProductParameterData[] | undefined;

    const expectedPreparedData: ProductParameterData[] = [{
      code: OptionCode.TITLE,
      value: 'Apple',
    }];

    fixture.detectChanges();

    component.searchProduct.pipe(first()).subscribe((preparedData: ProductParameterData[]) => {
      expect(preparedData).toEqual(expectedPreparedData);

    });

    component.productForm.controls['value'].setValue('Apple');

    fixture.whenStable().then(() => {
      expect(preparedDataTyped).toEqual(expectedPreparedData);
    });

  });
});
