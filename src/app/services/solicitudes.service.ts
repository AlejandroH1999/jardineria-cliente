import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SessionService } from './session.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient, private session: SessionService) { }

  postReporte(datos:any){
    return this.http.post(`${this.session.urlAPI}/reportes/datos`,datos).pipe(
      catchError(this.manejarErrores)
    )
  }

  GetReporte(folio:any){
    return this.http.get(`${this.session.urlAPI}/reportes/obtener/${folio}`).pipe(
      catchError(this.manejarErrores)
    )
  }


  manejarErrores(error:HttpErrorResponse){
    console.warn(error);
    return throwError(error);
  }
}
