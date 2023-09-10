import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { GifDetailComponent } from '../gif-detail/gif-detail.component';
import { DefaultTitleStrategy, Router } from '@angular/router';
import { FavouritesService } from 'src/app/services/favourites.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss']
})
export class GifsComponent implements OnInit, OnDestroy {

  distance = 2;

  throttle = 1000;
  offset = 0;
  gifs: any = [];
  subscription: Subscription;
  constructor(private dataService: DataService,
              private dialog: MatDialog,
              private fav: FavouritesService,
              private router: Router,
              private auth: AuthService
              ){ }

  ngOnInit(){
    // console.log(this.dataService.getFilter())
    // console.log(this.dataService.getSearch())
    if(this.router.url === '/dashboard'){
    switch(this.dataService.getFilter()){
      case "trending":
        this.dataService.getTrendingGifsOrSearchedGifs(0)
          this.subscription = this.dataService.getGifs()
            .subscribe((response: any) => {
              this.gifs.push(...response);
            })
            break;
      case "latest":
        this.dataService.getTrendingGifsOrSearchedGifs(0)
        this.subscription = this.dataService.getGifs()
            .subscribe((response: any) => {
              this.dataService.sortDataDescending(response)
              this.gifs.push(...response);
            })
            // console.log(this.dataService.getFilter())
            break;
      case "oldest":
        this.dataService.getTrendingGifsOrSearchedGifs(0)
        this.subscription = this.dataService.getGifs()
            .subscribe((response: any) => {
              this.dataService.sortDataAscending(response)
              this.gifs.push(...response);
            })
            break;
      default:
        this.dataService.getTrendingGifsOrSearchedGifs(0)
        this.subscription = this.dataService.getGifs()
            .subscribe((response: any) => {
              this.gifs.push(...response);
            })
      }
    }else if(this.router.url === "/favourites"){
      this.dataService.getGifsById(this.auth.getUserIdFromToken());
      this.subscription = this.dataService.getGifs()
            .subscribe((response: any) => {
              this.gifs = response;
            })
            // console.log('called')
    }
  }

  GifDetails(details:any){
    this.dialog.open(GifDetailComponent,{
      data: details
    });
  }

  onScroll(): void{
    if(this.router.url === '/favourite')
      return
    this.offset += 50
    switch(this.dataService.getFilter()){
      case "trending":
        this.dataService.getTrendingGifsOrSearchedGifs(this.offset)
        break;
      case "oldest":
        this.dataService.getTrendingGifsOrSearchedGifs(this.offset)
        this.dataService.sortDataDescending(this.gifs)
          break;
      case "latest":
        this.dataService.getTrendingGifsOrSearchedGifs(this.offset)
        this.dataService.sortDataAscending(this.gifs)
        break;
      default:
        this.dataService.getTrendingGifsOrSearchedGifs(this.offset)
  }
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
