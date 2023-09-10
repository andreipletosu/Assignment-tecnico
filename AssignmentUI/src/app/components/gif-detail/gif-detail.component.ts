import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss']
})


export class GifDetailComponent implements OnInit{

  status: boolean = false;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService, private fav: FavouritesService){ }

  ngOnInit(){
    
  }

  addFav(){
    this.status = true;
    this.fav.addToFavourites(this.auth.getUserIdFromToken(), this.data.id).subscribe()
  }
}
