import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit{
  public username: string = ""; 
  public role: string = "";
  public user: any = [];

  constructor(private auth: AuthService, private dataService: DataService, private userStore: UserStoreService, private router: Router){}
  ngOnInit(){
    this.userStore.getUsernameFromStore().subscribe(val=>{
      let usernameFromToken = this.auth.getUsernameFromToken();
      this.username = val || usernameFromToken;
    })

    this.userStore.getRoleFromStore().subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }
  goHome():void{
    this.router.navigate(['dashboard'])
    .then(()=>{
      window.location.reload()
    });
  }
  logout():void{
    this.auth.signOut();
  }
}
