import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {  UsuarioElement } from '../../interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  usuarios : UsuarioElement[]=[]
  error:boolean=false;

  constructor(private apiService :ApiService) { }

  ngOnInit(): void {

  }

  getUsers():void{
    this.apiService.getUsers()
    .subscribe({
      next: (resp)=> {
        this.usuarios = resp.usuarios
      },
      error: ()=> {
        this.error=true
        this.usuarios=[]
      }
    })

    let boton= document.querySelector("button");
    boton!.setAttribute("hidden","true");

  }



  deleteUser(userId: string): void {
    this.apiService.deleteUser(userId).subscribe(
      {
        next: (resp)=> {
          this.usuarios = resp.usuarios
          console.log('Usuario eliminado:', resp);
        },
        error: ()=> {
          this.error=true
          this.usuarios=[]
        }
      }
      // response => {
      //   console.log('Usuario eliminado:', response);
      //   // Actualiza la lista de usuarios después de eliminar uno
      //   this.getUsers();
      // },
      // error => {
      //   console.log('Error al eliminar el usuario:', error);
      // }
    );
  }

  
}
