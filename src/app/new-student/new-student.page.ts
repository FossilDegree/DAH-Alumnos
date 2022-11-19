import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup,FormBuilder,Validators, Form } from '@angular/forms';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public student : Student;
  public myForm : FormGroup;
  public validationMessages : Object;
  public careers : String[];
  public isSubmitted = false;
  public career;

  constructor(private studentService:StudentService,private formBuilder:FormBuilder,private toastController: ToastController) { }

  ngOnInit() {
    this.myForm=this.formBuilder.group(
      {
        numerocontrol:  ["",Validators.compose([Validators.required,Validators.minLength(7),Validators.maxLength(8),Validators.pattern('^[0-9]+$')])],
        nombre:         ["",Validators.required],
        curp:           ["",Validators.compose([Validators.required,Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
        edad:           ["",Validators.compose([Validators.required,Validators.min(18)])],
        nip:            ["",Validators.compose([Validators.required,Validators.min(10),Validators.max(9999)])],
        correo:         ["",Validators.compose([Validators.required,Validators.email])],
        foto:           ["",Validators.compose([Validators.required])]
      }
    );
//[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)
    this.validationMessages = {
      numerocontrol : [
        {
          type:'required',
          message:"Número de control obligatorio"
        },
        {
          type:'minlength',
          message:"El número de control debe ser de 8 caracteres"
        },
        {
          type:'maxlength',
          message:"El número de control debe ser de 8 caracteres"
        },
        {
          type:'pattern',
          message:"El número de control solo debe tener números"
        }
      ],
      nombre :[ 
        {
          type:'required',
          message:"Nombre obligatorio"
        }
      ],
      curp :[
        {
          type:'required',
          message:"CURP obligatoria"
        },
        {
          type:'pattern',
          message:"La CURP no es válida"
        }
      ],
      edad :[
        {
          type:'required',
          message:"Edad obligatoria"
        },
        {
          type:'min',
          message:"La edad no es válida"
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
        },
      ],
      correo :[
        {
          type:'required',
          message:"Correo obligatorio"
        },
        {
          type:'email',
          message:"Correo no válido"
        }
      ],
      foto :[
        {
          type:'required',
          message:"Foto obligatoria"
        },
        {
          type:'pattern',
          message:"Enlace no válido"
        }
      ]
    }
    this.careers=['ARQ','ISC','IM','IQ','IBQ','IC','IE'];
    
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.myForm.valid) {
      
      console.log('Please provide all the required values!')
      return false;
    }else{
      this.student={
        controlNumber:this.myForm.value.numerocontrol,
        name:this.myForm.value.nombre,
        curp:this.myForm.value.curp,
        age:this.myForm.value.edad,
        nip:this.myForm.value.nip,
        email:this.myForm.value.correo,
        photo:this.myForm.value.foto,
        career:this.career
      }
      this.newStudent();
      console.log(this.student);
      this.presentToast('bottom');
    }
  }
  public newStudent():void{
    this.studentService.newStudent(this.student);
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Estudiante Agregado!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }
  handleChange(e) {
    this.career=e.detail.value;
  }
}
