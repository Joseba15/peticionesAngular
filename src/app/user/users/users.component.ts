import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Usuario, UsuarioElement } from '../../interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: UsuarioElement[]=[];
  error:boolean=false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers()
    .subscribe({
      next: (resp)=> {
        this.users = resp.usuarios
      },
      error: ()=> {
        this.error=true
        this.users=[]
      }
    })
  }


  createUser(): void {

    const newUser = {
      "email": "josebadiaz@iesjacaranda.es",
      "nombre": "Joseba",
      "password":"joseba213"
    };

    this.apiService.createUser(newUser).subscribe(
      response => {
        console.log('Usuario creado:', response);
        // Actualiza la lista de usuarios después de crear uno nuevo
        this.getUsers();
      },
      error => {
        console.log('Error al crear el usuario:', error);
      }
    );
  }



  updateUser(userId: string): void {
    const updatedUser = {
      // Nuevos datos del usuario
    };

    this.apiService.updateUser(userId, updatedUser).subscribe(
      response => {
        console.log('Usuario actualizado:', response);
        // Actualiza la lista de usuarios después de actualizar uno
        this.getUsers();
      },
      error => {
        console.log('Error al actualizar el usuario:', error);
      }
    );
  }


  deleteUser(userId: string): void {
    this.apiService.deleteUser(userId).subscribe(
      response => {
        console.log('Usuario eliminado:', response);
        // Actualiza la lista de usuarios después de eliminar uno
        this.getUsers();
      },
      error => {
        console.log('Error al eliminar el usuario:', error);
      }
    );
  }


}
