import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  public student:Student;

  constructor(private studentService: StudentService,private route:ActivatedRoute) { 
    
  }

  ngOnInit() {

    this.route.queryParams.subscribe(
      (params)=>{
        this.student=this.studentService.getStudentByNC(params.controlNumber);
      }
    );
    //const nc = this.route.snapshot.paramMap.get('controlNumber');
    //console.log(`indice: ${index}`);
    //this.student=this.studentService.getStudentAt(index);
    
    // this.student=this.studentService.getStudentAt(
      
    // );
  }

}
