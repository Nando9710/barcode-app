import { Component } from '@angular/core';
import { RequestBarcodeApiService } from '../../core/services/request-barcode-api/request-barcode-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [RequestBarcodeApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private barcodeService: RequestBarcodeApiService) { }

  ngOnInit(): void {
    this.barcodeService.getProducts().subscribe(({ products }) => {
      console.log(products);
    })
  }
}
