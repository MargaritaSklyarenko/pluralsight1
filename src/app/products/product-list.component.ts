import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ProductService } from '../shared/product.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage:boolean = false;
  filteredProducts: IProduct[];
  products: IProduct[];
  
  _listFilter: string;

  constructor(private productService: ProductService) { 
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  onRatingCliked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

}
