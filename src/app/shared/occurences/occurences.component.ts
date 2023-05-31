import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  OccurrenceData,
  Occurrence,
} from 'src/app/core/interfaces/occurrences';
import { OccurrencesService } from 'src/app/core/services/occurrences.service';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

export class ProductService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  productNames: string[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
    'Grey T-Shirt',
    'Headphones',
    'Light Green T-Shirt',
    'Lime Band',
    'Mini Speakers',
    'Painted Phone Case',
    'Pink Band',
    'Pink Purse',
    'Purple Band',
    'Purple Gemstone Necklace',
    'Purple T-Shirt',
    'Shoes',
    'Sneakers',
    'Teal T-Shirt',
    'Yellow Earbuds',
    'Yoga Mat',
    'Yoga Set',
  ];

  generatePrduct(): Product {
    const product: Product = {
      id: this.generateId(),
      name: this.generateName(),
      description: 'Product Description',
      price: this.generatePrice(),
      quantity: this.generateQuantity(),
      category: 'Product Category',
      inventoryStatus: this.generateStatus(),
      rating: this.generateRating(),
    };

    product.image =
      product.name?.toLocaleLowerCase().split(/[ ,]+/).join('-') + '.jpg';
    return product;
  }

  generateId() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating() {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }
}

@Component({
  selector: 'occurences',
  templateUrl: './occurences.component.html',
  styleUrls: ['./occurences.component.scss'],
})
export class OccurencesComponent implements OnInit {
  @Input() isLogged: boolean = false;

  productDialog?: boolean;
  @Input() occurrences: OccurrenceData[] = [];

  occurrence: Partial<Occurrence> = {};
  selectedProducts?: Occurrence[] | null;
  submitted?: boolean = false;

  productService?: ProductService;
  term: string = '';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _occurrencesService: OccurrencesService
  ) {
    this.productService = new ProductService();
  }

  ngOnInit(): void {
    this.getAllOccurrences();
  }

  getAllOccurrences() {
    this._occurrencesService.getAllOccurrences().subscribe((data) => {
      this.occurrences = data;
    });
  }

  openNew() {
    this.occurrence = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.products = this.products?.filter(
        //   (val) => !this.selectedProducts?.includes(val)
        // );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(occurence: Occurrence) {
    this.occurrence = { ...occurence };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.products = this.products?.filter((val) => val.id !== product.id);
        this.occurrence = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (
    //   this.occurrence &&
    //   this.occurrence.local &&
    //   this.occurrence.local.trim() &&
    //   this.occurrences
    // ) {
    //   if (this.occurrence.id) {
    //     let index = this.findIndexById(String(this.occurrence.id));
    //     this.occurrences[index] = this.occurrence;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Product Updated',
    //       life: 3000,
    //     });
    //   } else {
    //     this.occurrence.id = this.createId();
    //     this.product.image = 'product-placeholder.svg';
    //     // this.products?.push(this.product);
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Product Created',
    //       life: 3000,
    //     });
    //   }

    this.productDialog = false;
    this.occurrence = {};
  }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   if (this.occurrences)
  //     for (let i = 0; i < this.occurrences.length; i++) {
  //       if (this.occurrences[i].id === id) {
  //         index = i;
  //         break;
  //       }
  //     }

  //   return index;
  // }
}
