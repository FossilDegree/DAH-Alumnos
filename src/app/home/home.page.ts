import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];

  constructor(private studentService: StudentService,private router:Router) {
    this.students=this.studentService.getStudents();
  }

  public deleteStudent(pos:number){
    this.studentService.removeStudent(pos);
    this.students=this.studentService.getStudents();
  }
  public getInfo(index:number){
    this.router.navigateByUrl(`/info/${index}`);
  }

  public getStudentByNC(nc:string){
    this.router.navigate(
      ['/info'],
      {
        queryParams:{controlNumber:nc}
      }
    );
  }
  public newStudent(){
    this.router.navigate(['/new-student']);
  }
  public updateStudent(index:number){
    this.router.navigate(
      ['/update-student'],
      {
        queryParams:{index:index}
      }
    );
    //this.router.navigateByUrl(`/update-student/${index}`);
  }

}
