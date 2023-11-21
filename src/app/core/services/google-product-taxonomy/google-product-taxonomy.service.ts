import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleProductTaxonomyService {
  constructor(private http: HttpClient) { }

  private urlSupabaseTaxonomyData = 'https://pbruebgxbqeqvwffgrpw.supabase.co/storage/v1/object/public/google-product-taxonomy/taxonomy.en-US.txt'

  public productTaxonomyData$: BehaviorSubject<string[] | null> = new BehaviorSubject<string[] | null>(null);

  public setProductTaxonomyData(data: string[] | null) {
    this.productTaxonomyData$.next(data);
  }

  public getGoogleProductTaxonomyData() {
    return this.http.get(this.urlSupabaseTaxonomyData, { responseType: 'text' });
  }
}
