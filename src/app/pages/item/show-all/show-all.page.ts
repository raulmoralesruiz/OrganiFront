import { Component, OnInit } from '@angular/core';
import { ItemInterface } from '../models/item.interface';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.page.html',
  styleUrls: ['./show-all.page.scss'],
})
export class ShowAllPage implements OnInit {

  /* Listado de artículos */
  items: ItemInterface[] = [];
  /* Bandera que activa/desactiva la vista de todos los artículos */
  allItemsView: boolean = false

  /* Bandera que activa/desactiva la vista de detalles de un artículo */
  detailsActivated: boolean = false;

  /* Índice del artículo mostrado */
  currentDisplayIndex: number = -1;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getAllItems();
  }

  /* Método que obtiene todos los artículos */
  getAllItems() {
    this.itemService.getAllItems().subscribe((res) => {
      this.items = res;
    });
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

  /* Método que oculta / muestra la vista de todos los artículos */
  toggleViewAllItems() {
    // Se activa la vista de todos los artículos
    this.allItemsView == false
      ? (this.allItemsView = true)
      : (this.allItemsView = false);
  }

}
