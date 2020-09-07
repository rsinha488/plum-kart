export class ProductModel {
    constructor(
      public id: number,
      public name: string,
      public price: number,
      public imageUrl: string, 
      public productDesc: string,
      public _id?: string, // _id is present if editing or returning from DB
    ) { }
  }
  