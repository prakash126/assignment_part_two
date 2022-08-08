import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) { }
  public url='http://localhost:3000/property'

  public properties:any = [];
  public getProperties():Observable<any>{
    return this.http.get(`${this.url}/getAllProperties`);
  }
  public addProperty(propertyObj:any):Observable<any>{
    return this.http.post(`${this.url}/addProperties`,propertyObj)
  }
  public deleteProperty(id:any):Observable<any>{
    return this.http.delete(`${this.url}/deleteProperty/${id}`)
  }
}
