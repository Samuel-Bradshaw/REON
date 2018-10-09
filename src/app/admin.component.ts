import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService  } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
  	    private adminService: AdminService,) { }

  ngOnInit() {
 
  }

  ngAfterViewInit(){
       if(!this.adminService.isLogged()){
      this.router.navigate(['/admin/login']);
    }

  }

  Logout():void{
    this.adminService.logout();
    this.router.navigate(['/admin/login']);

  }



}
