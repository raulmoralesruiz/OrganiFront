import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private idForUpdate = new BehaviorSubject('default');
  currentId = this.idForUpdate.asObservable();


  constructor(
    private http: HttpClient
  ) { }

  /* Cabecera necesaria para indicar token JWT */
  getHttpOptions(jwt: string) {
    return { headers: new HttpHeaders({ 'x-access-token': jwt }) };
  }

  setIdForUpdate(id_item: string) {
    this.idForUpdate.next(id_item);
  }

  updateItem(itemId:string, body:ItemUpdateInterface) {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${itemId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.put(endpoint, body, httpOptions);
  }

  getAllItems(): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/items`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.get(endpoint, httpOptions);
  }

  getItemByDescription(description: SearchDescriptionInterface): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/description`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, description, httpOptions);
  }

  searchItem(field_value: string): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/search`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, field_value, httpOptions);
  }

  getItemById(id: string): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${id}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.get(endpoint, httpOptions);
  }

  createItem(item: ItemInterface): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* crear grupo con los datos finales para el backend */
    return this.http.post(endpoint, item, httpOptions);
  }

  getHomes() {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/homes`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.get(endpoint, httpOptions);
  }

  getRooms(description: SearchDescriptionInterface): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/rooms`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, description, httpOptions);
  }

  getContainers(body: any): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/containers`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, body, httpOptions);
  }

  getCompartments(body: any): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/compartments`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, body, httpOptions);
  }

  deleteItemById(id: string): Observable<any> {
    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${id}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.delete(endpoint, httpOptions);
  }

}
