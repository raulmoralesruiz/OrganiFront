import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SearchDescriptionInterface } from '../models/search_description.interface';
import { ItemInterface } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  server = environment.ip

  constructor(
    private http: HttpClient
  ) { }
  
  getAllItems(): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/items`;

    /* Devolver datos */
    return this.http.get(endpoint);
  }

  getItemByDescription(description: SearchDescriptionInterface): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/description`;

    /* Devolver datos */
    return this.http.post(endpoint, description);
  }

  getItemById(id: string): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${id}`;

    /* Devolver datos */
    return this.http.get(endpoint);
  }

  createItem(item: ItemInterface): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item`;

    /* crear grupo con los datos finales para el backend */
    return this.http.post(endpoint, item);
  }

  getHomes() {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/homes`;

    /* Devolver datos */
    return this.http.get(endpoint);
  }

  getRooms(description: SearchDescriptionInterface): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/rooms`;

    /* Devolver datos */
    return this.http.post(endpoint, description);
  }

  getContainers(body: any): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/containers`;

    /* Devolver datos */
    return this.http.post(endpoint, body);
  }

  getCompartments(body: any): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/compartments`;

    /* Devolver datos */
    return this.http.post(endpoint, body);
  }

}
