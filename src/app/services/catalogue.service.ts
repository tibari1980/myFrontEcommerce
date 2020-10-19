import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public endPoint:string="http://localhost:8080/";
  constructor(private http: HttpClient) { }

  /*
  Méthode pour récupérer les données
  */
  getData(url:string){
    return this.http.get(this.endPoint+url);
  }
}
