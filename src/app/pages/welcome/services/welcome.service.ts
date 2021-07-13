import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SearchDescriptionInterface } from '../models/search_description.interface';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  server = environment.ip

  constructor(
    private http: HttpClient
  ) { }
  
  // getAllHomes(): Observable<any> {
  //   /* Dirección del servidor - petición */
  //   const endpoint = this.server + `/home`;

  //   /* Devolver datos */
  //   return this.http.get(endpoint);
  // }

  getItemByDescription(description: SearchDescriptionInterface): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/description`;

    /* Devolver datos */
    return this.http.post(endpoint, description);
  }

}
