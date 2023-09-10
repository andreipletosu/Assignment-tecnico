import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { FavouritesService } from './favourites.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  gifs$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  gifs: any = [];
  user: any = [];
  constructor(private http: HttpClient, private fav: FavouritesService) { }

  getTrendingGifsOrSearchedGifs(offsetValue: number){
    if(this.getSearch() !== ""){
      return this.http.get(`https://api.giphy.com/v1/gifs/search?q=${this.getSearch()}&api_key=${environment.giphyApiKey}&limit=50&offset=${offsetValue}`)
      .subscribe((response: any) =>{
        this.gifs$.next(response.data);
    })
  }else{
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}&limit=50&offset=${offsetValue}`)
    .subscribe((response: any) =>{
      this.gifs$.next(response.data);
    })
  }

  }

  getGifsById(id:string){
    this.fav.getFavourites(id).subscribe(res => {
      this.user = res;
      return this.http.get(`https://api.giphy.com/v1/gifs?api_key=${environment.giphyApiKey}&ids=${this.user.favourites}`)
      .subscribe((response: any) =>{
        this.gifs$.next(response.data);
      })
    })
  }

  getGifs(){
    return this.gifs$.asObservable();
  }
  getSearch(){
    return localStorage.getItem('gifName')
  }
  resetSearch(){
    localStorage.setItem('gifName', "")
    window.location.reload();
  }
  searching(searchTerm: string){
    if(searchTerm !== ""){
      localStorage.setItem('gifName', searchTerm)
      window.location.reload();
    }
  }
  setFilter(filter: string){
      localStorage.setItem('filter', filter)
      window.location.reload()
    }
  
  getFilter(){
    return localStorage.getItem('filter')
  }
  sortDataAscending(data: any) {
    return data.sort((a: any, b: any) => {
      return <any>new Date(a.import_datetime) - <any>new Date(b.import_datetime);
    });
  }

  sortDataDescending(data: any) {
    return data.sort((a: any, b: any) => {
      return <any>new Date(b.import_datetime) - <any>new Date(a.import_datetime);
    });
  }

}
