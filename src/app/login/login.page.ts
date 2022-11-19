import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
//import { Student } from '../models/student';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ionicForm: FormGroup;
  public isSubmitted = false;
  public validationMessages : Object;

  constructor(
    private studentService:StudentService,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private router:Router
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      numerocontrol:  ["",Validators.compose([Validators.required,Validators.minLength(7),Validators.maxLength(8),Validators.pattern('^[0-9]+$')])],
      nip:            ["",Validators.compose([Validators.required,Validators.min(10),Validators.max(9999)])] 
    });
    this.validationMessages ={
      numerocontrol:[
        {
          type:'required',
          message:"Número de control obligatorio"
        },
        {
          type:'pattern',
          message:"El número de control solo debe tener números"
        }
      ],
      nip :[
        {
          type:'required',
          message:"Nip obligatorio"
        },
        {
          type:'min',
          message:"Nip muy corta"
        },
        {
          type:'max',
          message:"Nip muy larga"
        }
      ]
    }

  }
  
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      
      console.log('Please provide all the required values!')
      return false;
    }else{
      let nc=this.ionicForm.value.numerocontrol.toString(),nip=this.ionicForm.value.nip;
      console.log(nc,nip);
      this.login(nc,nip);
    }
  }
  public login(nc:string,nip:number){
    let student = this.studentService.getStudentByNC(nc);
    if (student===undefined){
      console.log("Nc incorrecto");
      this.presentAlert();
      
    }else{
      if(student.nip==nip)
        this.router.navigateByUrl('/home');
      else{
        console.log("nip incorrecto");
        this.presentAlert();
      } 
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: '',
      message: 'Datos Erróneos',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
