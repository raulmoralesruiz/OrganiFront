import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemService } from '../services/item.service';
import { SearchDescriptionInterface } from '../models/search_description.interface';
import { ItemInterface } from '../models/item.interface';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ItemUpdateInterface } from '../models/item_update.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  /* Listado de artículos */
  items: ItemInterface[] = [];
  /* Bandera que activa/desactiva la vista de todos los artículos */
  allItemsView: boolean = false;

  /* Cadena de texto utilizada en la búsqueda de artículos por descripción */
  itemDescription: string = '';
  /* Artículos encontrados en la búsqueda de artículos por descripción */
  itemsSearched: ItemInterface[] = [];

  /* Bandera que activa/desactiva la vista de detalles de un artículo */
  detailsActivated: boolean = false;

  /* Bandera que activa/desactiva la vista de acciones de un artículo */
  actionsActivated: boolean = false;

  /* Índice del artículo mostrado */
  itemSearchIndex: number = -1;
  itemShowAllIndex: number = -1;

  advancedSearchView: boolean = false;

  selectSearch: string = 'description';
  searchOptions: any[] = [
    'description',
    'color',
    'brand',
    'model',
    'group',
    // 'price',
    'store_link',
    'serial_number',
    // 'purchase_date',
    'warranty_years',
    'home.description',
    'room.description',
    'container.description'
  ];

  customPopoverOptions: any = {
    header: 'Filters',
    message: 'Select a section',
    // cssClass: 'custom-popover'
  };

  idForUpdate:string;
  subscription: Subscription;
  
  userId:string = '';


  constructor(
    private itemService: ItemService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getAllItems();
    this.getUserId();
  }

  getUserId() {
    this.userId = localStorage.getItem('user_id');
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

  /* Método que muestra artículos buscando por cualquier campo definido */
  searchItem() {
    let body: any = {
      [this.selectSearch]: this.itemDescription,
    };

    // Se comprueba si la descripción tiene al menos 3 caracteres
    if (this.itemDescription.length > 2) {
      // Se ejecuta la búsqueda
      this.itemService.searchItem(body).subscribe((res) => {
        this.itemsSearched = res;
      });
    }
  }

  searchItemByRoom(room_description: string) {
    // se habilita búsqueda avanzada
    this.enableAdvancedSearchView();

    // se especifica el campo de búsqueda
    this.selectSearch = 'room.description';

    // se especifica el valor de la búsqueda
    this.itemDescription = room_description;
  }

  searchItemByField(room_description: string, field:string) {
    // se habilita búsqueda avanzada
    this.enableAdvancedSearchView();

    // se especifica el campo de búsqueda
    this.selectSearch = field;

    // se especifica el valor de la búsqueda
    this.itemDescription = room_description;
  }

  /* Método que oculta / muestra los detalles de un artículo */
  showHideDetails() {
    this.detailsActivated == false
      ? (this.detailsActivated = true)
      : (this.detailsActivated = false);
  }

  /* Método que oculta / muestra los detalles de un artículo */
  showHideActions(id: string) {
    this.actionsActivated == false
      ? (this.actionsActivated = true)
      : (this.actionsActivated = false);

    if (this.actionsActivated) {
      this.actionSheetOneItem(id);
    }
  }

  /* Método que oculta / muestra el contenido de un artículo */
  hideSearchItems(index: number) {
    //Reset the index if the current item index is same as the item index passed on button click
    if (this.itemSearchIndex == index) {
      this.itemSearchIndex = -1;
      return;
    }
    //Set the current index to the item index passed from template. If you click on item number 3, only 3rd item details will be visible
    this.itemSearchIndex = index;
  }

  /* Método que oculta / muestra el contenido de un artículo */
  hideShowAllItems(index: number) {
    //Reset the index if the current item index is same as the item index passed on button click
    if (this.itemShowAllIndex == index) {
      this.itemShowAllIndex = -1;
      return;
    }
    //Set the current index to the item index passed from template. If you click on item number 3, only 3rd item details will be visible
    this.itemShowAllIndex = index;
  }

  /* Método que muestra el embalaje de un artículo */
  showItemPackage(id: string) {
    this.itemService.getItemById(id).subscribe((res) => {
      this.itemDescription = res.description;
    });
  }

  /* Método que obtiene todos los artículos */
  getAllItems() {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    if (jwt) {
      this.itemService.getAllItems().subscribe(
        (res) => {
          this.items = res;
        },
        (error) => {
          // se muestra mensaje de error
          if (error.status == 401) {
            this.loginError();
            this.router.navigate(['/login']);
          }
        }
      );
    } else {
      this.loginError();
      this.router.navigate(['/login']);
    }
  }

  /* Método que oculta / muestra la vista de todos los artículos */
  toggleViewAllItems() {
    // Se activa la vista de todos los artículos
    this.allItemsView == false
      ? (this.allItemsView = true)
      : (this.allItemsView = false);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Items actions',
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      buttons: [
        {
          text:
            this.allItemsView == false ? 'Show all items' : 'Hide all items',
          cssClass: 'primaryIconColor',
          icon: 'albums',
          handler: () => {
            this.toggleViewAllItems();
          },
        },
        {
          text: 'Close',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  showActionsheet() {
    this.presentActionSheet();
  }

  /* Método que muestra el embalaje de un artículo */
  deleteItem(id: string) {
    this.itemService.deleteItemById(id).subscribe((res) => {
      // borrar cadena de búsqueda
      this.itemDescription = '';

      // recargar lista de artículo
      this.getAllItems();
    });
  }

  async actionSheetOneItem(id: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Items actions',
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Delete item',
          role: 'destructive',
          cssClass: 'dangerIconColor',
          icon: 'trash',
          handler: () => {
            //eliminar
            this.showDeleteAlert(id);
          },
        },
        {
          text: 'Update item',
          cssClass: 'primaryIconColor',
          icon: 'create',
          handler: () => {
            // se establece el id para enviarlo a componente create/update
            this.itemService.setIdForUpdate(id);

            // se redirige a componente create/update
            this.router.navigate(['/create']);
          },
        },
        {
          text: 'Close',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // cerrar action sheet del artículo
            this.actionsActivated = false;
          },
        },
      ],
    });
    await actionSheet.present();
  }

  /* Método que oculta / muestra los detalles de un artículo */
  enableAdvancedSearchView() {
    this.advancedSearchView = true;
  }

  /* Método que oculta / muestra los detalles de un artículo */
  disableAdvancedSearchView() {
    this.advancedSearchView = false;
  }

  /* Método que limpia la barra de búesqueda */
  checkSearchBar() {
    if (!this.advancedSearchView) {
      this.itemDescription = '';
    }
  }

  async showDeleteAlert(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-danger',
      header: 'Delete item',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteItem(id);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  doRefresh(event) {
    this.getAllItems();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  /* Alerta con mensaje de error */
  async loginError() {
    const alert = await this.alertController.create({
      cssClass: 'alert-danger',
      header: 'Error 401',
      message: 'Unauthorized access',
      buttons: ['OK']
    });

    await alert.present();
  }

  // /* Alerta con mensaje de bienvenida */
  // async loginOk() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'alert-ok',
  //     header: 'Welcome!',
  //     message: "it's time to organize!",
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

}
