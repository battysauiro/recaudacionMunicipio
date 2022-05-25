import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    //this.authService.isAuthenticated()
  }
  
}
