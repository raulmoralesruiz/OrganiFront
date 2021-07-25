import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SearchDescriptionInterface } from '../models/search_description.interface';
import { ItemInterface } from '../models/item.interface';
import { ItemUpdateInterface } from '../models/item_update.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  server = environment.ip
  // idForUpdate: string = null;

  private idForUpdate = new BehaviorSubject('default');
  currentId = this.idForUpdate.asObservable();


  constructor(
    private http: HttpClient
  ) { }

  setIdForUpdate(id_item: string) {
    this.idForUpdate.next(id_item);
  }

  updateItem(itemId:string, body:ItemUpdateInterface) {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${itemId}`;

    /* Devolver datos */
    return this.http.put(endpoint, body);
  }
  
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

  searchItem(field_value: string): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/search`;

    /* Devolver datos */
    return this.http.post(endpoint, field_value);
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

  deleteItemById(id: string): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${id}`;

    /* Devolver datos */
    return this.http.delete(endpoint);
  }

}
