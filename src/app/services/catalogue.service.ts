import { HttpClient, HttpEvent, HttpHeaders, HttpRequest,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { createContentChild } from '@angular/compiler/src/core';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  
  public endPoint:string="http://localhost:8080/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 
  constructor(private http: HttpClient) { }

  /*
  Méthode Get
  */
  getData(url:string){
    return this.http.get(this.endPoint+url);
  }
  
  /*
    Méthode Post
  */
  createData(data:Object,url:string): Observable<Object> {
    return this.http.post<Object>(this.endPoint+url, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  updateData(data:Object,url:string,id:number):Observable<Object>{
    return this.http.put<Object>(this.endPoint+url+"/"+id,JSON.stringify(data),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updataDataWidthOtherParams(data:Object,url:string,idProd:number,idCate:number){
    return this.http.put<Object>(this.endPoint+url+"/"+idProd+"/"+idCate,JSON.stringify(data),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  /*
  ** Méthode permet de supprime un objet (DataRessource)
  */
  deleteData(url:string):Observable<Object>{
    return this.http.delete<Object>(this.endPoint+url,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  /*
   méthode find one 
  */
  findOne(url){
    return this.http.get(this.endPoint+url);
  }
  /*
    modifié la photo d'un produit
  */
  uploadDonnesProducts(file:File,idProduct:number):Observable<HttpEvent<{}>> {
    let formData:FormData=new FormData();
    formData.append('file',file);
    const req=new HttpRequest('POST',this.endPoint+"/uploadPhotoProduct/"+idProduct,formData,{
      reportProgress:true,
      responseType:'text'
    })
    return this.http.request(req);
  }

  /*
   méthode pour modifier la photo d'un categorié
  */
  uploadDonnesCategories(file:File,idCategorie:number):Observable<HttpEvent<{}>> {
    let formData:FormData=new FormData();
    formData.append('file',file);
    const req=new HttpRequest('POST',this.endPoint+"/uploadPhotoCategorie/"+idCategorie,formData,{
      reportProgress:true,
      responseType:'text'
    })
    return this.http.request(req);
  }



  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
