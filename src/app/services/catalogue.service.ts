import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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

  uploadDonnesProducts(file:File,idProduct:number):Observable<HttpEvent<{}>> {
    let formData:FormData=new FormData();
    formData.append('file',file);
    const req=new HttpRequest('POST',this.endPoint+"/uploadPhotoProduct/"+idProduct,formData,{
      reportProgress:true,
      responseType:'text'
    })
    return this.http.request(req);
  }
}
