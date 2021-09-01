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
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${userId}/${itemId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.put(endpoint, body, httpOptions);
  }

  getAllItems(): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/items/${userId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.get(endpoint, httpOptions);
  }

  getItemByDescription(description: SearchDescriptionInterface): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/description/${userId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, description, httpOptions);
  }

  searchItem(field_value: string): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/search/${userId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, field_value, httpOptions);
  }

  getItemById(id_doc: string): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${userId}/${id_doc}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.get(endpoint, httpOptions);
  }

  createItem(item: ItemInterface): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${userId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* crear grupo con los datos finales para el backend */
    return this.http.post(endpoint, item, httpOptions);
  }

  getHomes() {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/homes/${userId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.get(endpoint, httpOptions);
  }

  getRooms(description: SearchDescriptionInterface): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/rooms/${userId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, description, httpOptions);
  }

  getContainers(body: any): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/containers/${userId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, body, httpOptions);
  }

  getCompartments(body: any): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/compartments/${userId}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.post(endpoint, body, httpOptions);
  }

  deleteItemById(id_doc: string): Observable<any> {
    /* Id del usuario actual */
    const userId = localStorage.getItem('user_id');

    /* Dirección del servidor - petición */
    const endpoint = this.server + `/item/${userId}/${id_doc}`;

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = this.getHttpOptions(jwt);

    /* Devolver datos */
    return this.http.delete(endpoint, httpOptions);
  }

}
