import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../app/user';
import { Comic } from '../app/comic';
import { Review } from '../app/review';
import { catchError } from 'rxjs/operators';
import { ComicPrice, ComicPrice2 } from './comicPrice';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root',
})
export class ComicfriendsService {
  data: User = User[0];
  data2: Comic = Comic[0];
  //data3: Comic[] = [];
  data4: ComicPrice[] = [];
  private comicFriendsUrl = 'https://192.168.0.16:8080/ComicFriends'; // URL to web api

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

  addUser(user: User): Observable<any> {
    return this.http
      .post<User>(this.comicFriendsUrl + '/user/add', user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUser(username: String, password: String): Observable<User> {
    return this.http
      .get<User>(this.comicFriendsUrl + '/user/' + username + '/' + password)
      .pipe(catchError(this.handleError));
  }

  getUserById(id: String): Observable<User> {
    return this.http
      .get<User>(this.comicFriendsUrl + '/user/' + id)
      .pipe(catchError(this.handleError));
  }

  getComic(title: String): Observable<Comic> {
    return this.http
      .get<Comic>(this.comicFriendsUrl + '/comic/' + 'name/' + title)
      .pipe(catchError(this.handleError));
  }

  getComicById(id: String): Observable<Comic> {
    return this.http
      .get<Comic>(this.comicFriendsUrl + '/comic/' + id)
      .pipe(catchError(this.handleError));
  }

  getComics(): Observable<any> {
    return this.http
      .get<Comic>(this.comicFriendsUrl + '/comics')
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<any> {
    return this.http
      .get<User>(this.comicFriendsUrl + '/users')
      .pipe(catchError(this.handleError));
  }

  getComicPrices(): Observable<any> {
    return this.http
      .get<ComicPrice>(this.comicFriendsUrl + '/comicPrices')
      .pipe(catchError(this.handleError));
  }

  getOwnedComics(username: String): Observable<any> {
    return this.http
      .get<Comic>(this.comicFriendsUrl + '/comic/' + 'owned/' + username)
      .pipe(catchError(this.handleError));
  }

  getDesiredComics(username: String): Observable<any> {
    return this.http
      .get<Comic>(this.comicFriendsUrl + '/comic/' + 'desired/' + username)
      .pipe(catchError(this.handleError));
  }

  getForSaleComics(username: String): Observable<any> {
    return this.http
      .get<Comic>(this.comicFriendsUrl + '/comic/' + 'forsale/' + username)
      .pipe(catchError(this.handleError));
  }

  deleteUser(): Observable<any> {
    return this.http
      .post<User>(
        this.comicFriendsUrl + '/user/delete',
        this.data,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  modifyUser(user: User): Observable<any> {
    return this.http
      .post<User>(this.comicFriendsUrl + '/user/modify', user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  searchComic(
    scope: String,
    filter: String,
    criteria: String
  ): Observable<any> {
    return this.http
      .get<String>(
        this.comicFriendsUrl +
          '/comic/search/' +
          scope +
          '/' +
          filter +
          '/' +
          criteria
      )
      .pipe(catchError(this.handleError));
  }

  addComic(comic: Comic, user_Id: String): Observable<any> {
    return this.http
      .post<Comic>(
        this.comicFriendsUrl + '/comic/add' + '?user_id=' + user_Id,
        comic,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteComic(comic: Comic, user_Id: String): Observable<any> {
    return this.http
      .post<Comic>(
        this.comicFriendsUrl + '/comic/delete' + '?user_id=' + user_Id,
        comic,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  addComicToList(
    comic_Id: String,
    user_Id: String,
    n: number, // if 0 -> lista deseados, if 1 -> lista en propiedad 
    price: number
  ): Observable<any> {
    return this.http
      .post<User>(
        this.comicFriendsUrl +
          '/comic/addToList' +
          '?comic_id=' +
          comic_Id +
          '&user_id=' +
          user_Id +
          '&n=' +
          n +
          '&price=' +
          price,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteComicfromList(
    comic_Id: String,
    user_Id: String,
    n: number,
    price: number
  ): Observable<any> {
    return this.http
      .post<User>(
        this.comicFriendsUrl +
          '/comic/removeFromList' +
          '?comic_id=' +
          comic_Id +
          '&user_id=' +
          user_Id +
          '&n=' +
          n +
          '&price=' +
          price,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  addReview(review: Review): Observable<any> {
    return this.http
      .post<Review>(
        this.comicFriendsUrl + '/review/add',
        review,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getReviews(): Observable<any> {
    return this.http
      .get<Review>(this.comicFriendsUrl + '/reviews')
      .pipe(catchError(this.handleError));
  }

  getReviewById(id: String): Observable<Review> {
    return this.http
      .get<Review>(this.comicFriendsUrl + '/review/' + id)
      .pipe(catchError(this.handleError));
  }

  deleteReview(review: Review): Observable<any> {
    return this.http
      .post<Review>(
        this.comicFriendsUrl + '/review/delete',
        review,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getComicPriceById(id: String): Observable<any> {
    return this.http
      .get<ComicPrice2>(this.comicFriendsUrl + '/ComicPrice/' + id)
      .pipe(catchError(this.handleError));
  }

  getComicPrice(comic_id: String, user_id: String): Observable<any> {
    return this.http
      .get<ComicPrice2>(this.comicFriendsUrl + '/ComicPrice/find/' + comic_id + '/' + user_id)
      .pipe(catchError(this.handleError));
  }

  buyComic(transaction: Transaction): Observable<any> {
    return this.http
      .post<Transaction>(
        this.comicFriendsUrl + '/transaction/add',
        transaction,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  loginbyfacebook(): Observable<any> {
    return this.http
      .get<String>(this.comicFriendsUrl + '/createFacebookAuthorization')
      .pipe(catchError(this.handleError));
  }

  loginbyfacebook2(): Observable<any> {
    return this.http
      .get<String>(this.comicFriendsUrl + '/insert')
      .pipe(catchError(this.handleError));
  }
}
