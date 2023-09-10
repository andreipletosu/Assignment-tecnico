import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {


  private baseUrl: string = "https://localhost:7117/api/User/";


  constructor(private http : HttpClient) { }

  addToFavourites(userId: string, favouriteId: string){
    return this.http.put<any>(`${this.baseUrl}favourites?userId=${userId}&favouriteId=${favouriteId}`, null);
  }

  getFavourites(userId: string){
    return this.http.get<any>(`${this.baseUrl}get_favourites?userId=${userId}`);
  }
}
