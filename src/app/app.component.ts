import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthServiceService } from './authService/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.authService.autoAuthUser()
  }

}
