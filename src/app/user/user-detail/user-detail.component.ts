import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UsuarioElement } from '../../interface';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  updateForm!: FormGroup; //Felipe: Prueba a declarar los campos vacios aqui para poder actualizarlos
                          //al iniciar el componente
  uid!: string;
  user!: UsuarioElement;

  constructor(private formBuilder: FormBuilder, private service : ApiService,private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
    this.uid= this.route.snapshot.params['uid']
    console.log(this.uid);
    
    this.service.getUser(this.uid).subscribe({
      next:(resp)=>{
        this.user=resp
      },
      error: (error)=>{
        console.log(error);
        
      }
    })

  }

  onSubmit() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      this.service.updateUser(this.uid,this.user).subscribe({
        next: (resp) => { 
          console.log(resp);
          
        
      }})
    }
  }

  get email(){ return this.updateForm.get('email')}

  get role(){ return this.updateForm.get('role')}

  get nombre(){ return this.updateForm.get('nombre')}



}
