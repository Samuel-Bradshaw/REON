import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService  } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {

  constructor(private router: Router,
  	    private adminService: AdminService,) { }

  ngOnInit() {
  	//if(this.adminService.getUser()===null){
  	//	this.router.navigate(['/admin/login']);
  	//}
  }

}
