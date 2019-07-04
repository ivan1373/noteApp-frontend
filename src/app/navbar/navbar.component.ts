import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../model/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //current: User;

  constructor(private router: Router,
    private authenticationService: AuthService) {
      
     }

  ngOnInit() {
    
    
  }

  

  logoutUser() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    
  }

  setUser() {
    this.authenticationService.getUser()
    .subscribe(
      (data:User) => this.current = data,
      error => {console.log(error)}
      
      );
  }

}
