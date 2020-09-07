import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { throwError as ObservableThrowError, Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENV } from './env.config';
import { EventModel } from './models/event.model';
import { RsvpModel } from './models/rsvp.model';
import { ProductModel } from './models/product.model';
import { BasketModel } from './models/basket.model';
import { Subject } from 'rxjs';
 
@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  products: ProductModel[]=[
   
    new ProductModel(1,'Product 1',100,'../../assets/images/IMG_20200725_120235.jpg','This is the Product 1'),
    new ProductModel(2,'Product 2',100,'../../assets/images/IMG_20200725_120235.jpg','This is the Product 2'),
    new ProductModel(3,'Product 3',100,'../../assets/images/IMG_20200725_120235.jpg','This is the Product 3'),
    new ProductModel(4,'Product 4',100,'../../assets/images/IMG_20200725_120235.jpg','This is the Product 4'),
    new ProductModel(5,'Product 5',100,'../../assets/images/IMG_20200725_120235.jpg','This is the Product 5'),
    new ProductModel(6,'Product 6',100,'../../assets/images/IMG_20200725_120235.jpg','This is the Product 6'),
    new ProductModel(7,'Product 7',100,'../../assets/images/IMG_20200725_120235.jpg','This is the Product 5'),
    new ProductModel(8,'Product 8',100,'../../assets/images/IMG_20200725_120235.jpg','This is the Product 6')
 
  ]
  subject = new Subject()
  getProducts():ProductModel[]{
     //TODO: Populate products from API and return an observable
    return this.products
  }
  sendMsg(product){
    // console.log(product)
    this.subject.next(product)
  }
  getMsg(){
    return this.subject.asObservable()
  }
  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  // GET list of public, future events
  getEvents$(): Observable<EventModel[]> {
    return this.http
      .get<EventModel[]>(`${ENV.BASE_API}events`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET all events - private and public (admin only)
  getAdminEvents$(): Observable<EventModel[]> {
    return this.http
      .get<EventModel[]>(`${ENV.BASE_API}events/admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET an event by ID (login required)
  getEventById$(id: string): Observable<EventModel> {
    return this.http
      .get<EventModel>(`${ENV.BASE_API}event/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET RSVPs by event ID (login required)
  getRsvpsByEventId$(eventId: string): Observable<RsvpModel[]> {
    return this.http
      .get<RsvpModel[]>(`${ENV.BASE_API}event/${eventId}/rsvps`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // POST new event (admin only)
  postEvent$(event: EventModel): Observable<EventModel> {
    return this.http
      .post<EventModel>(`${ENV.BASE_API}event/new`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing event (admin only)
  editEvent$(id: string, event: EventModel): Observable<EventModel> {
    return this.http
      .put<EventModel>(`${ENV.BASE_API}event/${id}`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deleteEvent$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}event/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET all events a specific user has RSVPed to (login required)
  getUserEvents$(userId: string): Observable<EventModel[]> {
    return this.http
      .get<EventModel[]>(`${ENV.BASE_API}events/${userId}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // POST new RSVP (login required)
  postRsvp$(rsvp: RsvpModel): Observable<RsvpModel> {
    return this.http
      .post<RsvpModel>(`${ENV.BASE_API}rsvp/new`, rsvp, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing RSVP (login required)
  editRsvp$(id: string, rsvp: RsvpModel): Observable<RsvpModel> {
    return this.http
      .put(`${ENV.BASE_API}rsvp/${id}`, rsvp, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return ObservableThrowError(errorMsg);
  }

  

//PRODUCT CRUD
  // GET all products 
  // getProducts$(userId: string): Observable<ProductModel[]> {
  //   return this.http
  //     .get<ProductModel[]>(`${ENV.BASE_API}products${userId}`, {
  //       headers: new HttpHeaders().set('Authorization', this._authHeader)
  //     })
  //     .pipe(
  //       catchError((error) => this._handleError(error))
  //     );
  // }
  
  // POST new product (admin only)
  postProduct$(product: ProductModel): Observable<ProductModel> {
    return this.http
      .post<ProductModel>(`${ENV.BASE_API}product/new`, product, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing product (admin only)
  editProduct$(id: string, product: EventModel): Observable<EventModel> {
    return this.http
      .put<ProductModel>(`${ENV.BASE_API}product/${id}`, product, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deleteProduct$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}product/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  
  //Add to Basket/Cart
  addToCart$(product: BasketModel): Observable<ProductModel> {
    return this.http
      .post<BasketModel>(`${ENV.BASE_API}cart/new`, product, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  
  // remove product from basket
  removeFromCart$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}cart/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
}

