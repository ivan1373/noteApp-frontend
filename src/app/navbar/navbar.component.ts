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

  

  constructor(private router: Router,
    public authenticationService: AuthService) {
      
     }

  ngOnInit() {
    
    
  }

  

  logoutUser() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    
  }

  

}
