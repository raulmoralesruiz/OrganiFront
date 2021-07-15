import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { SearchDescriptionInterface } from '../models/search_description.interface';
import { stringify } from '@angular/compiler/src/util';
import { ItemInterface } from '../models/item.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  
  /* Listado de artículos */
  items: ItemInterface[] = [];
  /* Bandera que activa/desactiva la vista de todos los artículos */
  allItemsView: boolean = false
  
  /* Cadena de texto utilizada en la búsqueda de artículos por descripción */
  itemDescription: string = '';
  /* Artículos encontrados en la búsqueda de artículos por descripción */
  itemsSearched: ItemInterface[] = [];

  /* Bandera que activa/desactiva la vista de detalles de un artículo */
  detailsActivated: boolean = false;

  /* Índice del artículo mostrado */
  currentDisplayIndex: number = -1;


  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.getAllItems();
  }

  /* Método que muestra artículos buscando por descripción */
  getItemByDescription() {
    // Se define el objeto con la descripción a buscar
    let body: SearchDescriptionInterface = {
      description: this.itemDescription,
    };

    // Se comprueba si la descripción tiene al menos 3 caracteres
    if (body.description.length > 2) {
      // Se ejecuta la búsqueda
      this.itemService.getItemByDescription(body).subscribe((res) => {
        this.itemsSearched = res;
      });
    }
  }

  /* Método que oculta / muestra los detalles de un artículo */
  showHideDetails() {
    this.detailsActivated == false
      ? (this.detailsActivated = true)
      : (this.detailsActivated = false);
  }

  /* Método que oculta / muestra el contenido de un artículo */
  hide(index: number) {
    //Reset the index if the current item index is same as the item index passed on button click
    if (this.currentDisplayIndex == index) {
      this.currentDisplayIndex = -1;
      return;
    }
    //Set the current index to the item index passed from template. If you click on item number 3, only 3rd item details will be visible
    this.currentDisplayIndex = index;
  }

  /* Método que muestra el embalaje de un artículo */
  showItemPackage(id: string) {
    this.itemService.getItemById(id).subscribe((res) => {
      this.itemDescription = res.description;
    });
  }

  /* Método que obtiene todos los artículos */
  getAllItems() {
    this.itemService.getAllItems().subscribe((res) => {
      this.items = res;
    });
  }

  /* Método que oculta / muestra la vista de todos los artículos */
  toggleViewAllItems() {
    // Se activa la vista de todos los artículos
    this.allItemsView == false
      ? (this.allItemsView = true)
      : (this.allItemsView = false);
  }

}
