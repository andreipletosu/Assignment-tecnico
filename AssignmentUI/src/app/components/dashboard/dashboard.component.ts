import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public username: string = ""; 
  public role: string = "";
  public filter: any = "";
  constructor(private auth: AuthService,
              private api: ApiService,
              private userStore: UserStoreService,
              private dataService: DataService,
              private router: Router
              ){}

  ngOnInit(){
    this.api.getUsers().subscribe(res => {
      this.users = res;
    })
    this.filter = localStorage.getItem('filter')
    this.userStore.getUsernameFromStore().subscribe(val=>{
      let usernameFromToken = this.auth.getUsernameFromToken();
      this.username = val || usernameFromToken;
    })

    this.userStore.getRoleFromStore().subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }
  reset():void{
    localStorage.removeItem('filter');
    localStorage.removeItem('gifName');
    this.dataService.resetSearch();
  }
  logout():void{
    this.auth.signOut();
  }

  checkAndDo(ob: MatRadioChange) {
    this.dataService.setFilter(ob.value)
  }

  redirectToFavourites(){
    this.router.navigate(['favourites']);
  }
}
