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

  getHomeDescriptions() {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/homes/description`;

    /* Devolver datos */
    return this.http.get(endpoint);
  }

  getHomeAddresses() {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/homes/address`;

    /* Devolver datos */
    return this.http.get(endpoint);
  }

  getRooms() {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/rooms`;

    /* Devolver datos */
    return this.http.get(endpoint);
  }

  getContainerDescriptions() {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/containers/description`;

    /* Devolver datos */
    return this.http.get(endpoint);
  }

  getContainerColors() {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/containers/color`;

    /* Devolver datos */
    return this.http.get(endpoint);
  }

}
