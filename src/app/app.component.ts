import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private showLoadingIndicator:boolean=true;

  constructor(private router : Router){

      this.router.events.subscribe((routerEvent : Event)=>{

          if(routerEvent instanceof NavigationStart){
              this.showLoadingIndicator =true;
          }
          
          if(routerEvent instanceof NavigationEnd){
              this.showLoadingIndicator =false;
          }
      })

  }

}
