import { Injectable } from '@angular/core';
import { Student } from '../models/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor() { 
    this.students=[
      {
        controlNumber: "18401118",
        age: 22,
        career: "ISC",
        curp: "GAMA000830HNM",
        email: "ancagarciamo@ittepic.edu.mx",
        name: "Antonio Carlos García Moreno",
        nip: 9250,
        photo: '/src/assets/usuario-blanco.png'
      },
      {
        controlNumber: "18401154",
        age: 23,
        career: "ISC",
        curp: "ARHA990509HNM",
        email: "anaxarvizuhu@ittepic.edu.mx",
        name: "Ángel Áxel Arvizu Hurtado",
        nip: 9251,
        photo: '/src/assets/usuario-blanco.png'
      }
    ];
  }
  public getStudents(): Student[]{
    return this.students;
  }
  public getStudentAt(pos:number):Student{
    return this.students[pos];
  }
  public removeStudent(pos:number){
    this.students.splice(pos,1);
  }
  public getStudentByNC(nc:string):Student{
    let it: Student;
    it = this.students.find(
      (student)=>{
        return student.controlNumber==nc;
      }
    );
    return it;
  }
  public getStudentByMail(mail:string):Student{
    let it: Student;
    it = this.students.find(
      (student)=>{
        return student.email==mail;
      }
    );
    return it;
  }
  public newStudent(student:Student){
    this.students.push(student);
  }
}
