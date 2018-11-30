import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from "@angular/router";

@Component({

    templateUrl: 'courses.component.html',
    styleUrls: ['courses.component.css']

})

export class CourseComponent implements OnInit {

    button: boolean;

    constructor(private router: Router,
        private route: ActivatedRoute,) {
            
        //   this.router.events.subscribe((routerEvent : Event )=>{

        //     if(routerEvent instanceof NavigationStart){
        //         this.button=true;
        //     }
        //     if(routerEvent instanceof NavigationEnd){
        //         this.button=false;
        //     }

        //   });                   

    }
    
    ngOnInit() {
    };

    

}