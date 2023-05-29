import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioElement } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://recu-angular-backend2.vercel.app/api/';


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Si es necesario, incluye aquí los encabezados adicionales requeridos, como la autorización.
    });
    return headers;
  }



  // Ejemplo de petición GET para obtener todos los usuarios
  getUsers(): Observable<Usuario> {
    const url = this.baseUrl + 'usuarios';
    const headers = this.getHeaders();

    return this.http.get<Usuario>(url,{headers});
  }

  // Ejemplo de petición POST para crear un usuario
  createUser(user: any): Observable<any> {
    const url = this.baseUrl + 'usuarios';
    const headers = this.getHeaders();
    return this.http.post(url, user, { headers });
  }

  // Ejemplo de petición PUT para actualizar un usuario
  updateUser(userId: string, user: any): Observable<Usuario> {
    const url = this.baseUrl + `usuarios/${userId}`;
    const headers = this.getHeaders();
    return this.http.put<Usuario>(url, user, { headers });
  }

  // Ejemplo de petición DELETE para eliminar un usuario
  deleteUser(userId: string): Observable<Usuario> {
    const url = this.baseUrl + `usuarios/${userId}`;
    const headers = this.getHeaders();
    return this.http.delete<Usuario>(url, { headers });
  }


  getUser(userId: string): Observable<UsuarioElement> {
    const url = this.baseUrl + `usuarios/${userId}`;
    const headers = this.getHeaders();
    return this.http.get<UsuarioElement>(url, { headers });
  }




}
