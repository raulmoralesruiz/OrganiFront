import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, PickerController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItemInterface } from '../models/item.interface';
import { SearchDescriptionInterface } from '../models/search_description.interface';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  /* Formulario reactivo para la creación del artículo */
  createItemForm = new FormGroup({
    /* ITEM */
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    color: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    brand: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    model: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    group: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    price: new FormControl(null, [Validators.min(0)]),
    store_link: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(300),
    ]),
    serial_number: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    // purchase_date: new FormGroup({
    //   $date: new FormControl(null, [Validators.required]),
    // }),
    purchase_date: new FormControl(null, []),
    warranty_years: new FormControl(null, [Validators.min(0)]),
    /* HOME */
    home: new FormGroup({
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      address: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    }),
    /* ROOM */
    room: new FormGroup({
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      floor: new FormControl(null, [Validators.min(0)]),
    }),
    /* CONTAINER */
    container: new FormGroup({
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      color: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    }),
    /* COMPARTMENT */
    compartment: new FormGroup({
      row: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
      ]),
      column: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
      ]),
    }),
  });

  /* Variable que muestra aviso 'cargando'  */
  loading: HTMLIonLoadingElement;

  /* Arrays obtenidos del servidor */
  homesDescriptionsArray: any = [];
  roomsArray: any = [];
  containersArray: any = [];
  compartmentsArray: any = [];

  /* Variables que almacenan el valor del picker seleccionado */
  homeDescription: any;
  homeAddress: any;
  roomDescription: any;
  roomFloor: any;
  containerDescription: any;
  containerColor: any;
  compartmentRow: any;
  compartmentColumn: any;
  purchaseDatePicker: any;

  /* Opciones del picker de fecha */
  datePickerOptions = {
    backdropDismiss: false,
  };

  idForUpdate: string;
  subscription: Subscription;

  itemSelectedColor = 'Item color';
  movingView = false;

  constructor(
    private itemService: ItemService,
    private loadingController: LoadingController,
    private pickerController: PickerController,
    private datePipe: DatePipe,
    private router: Router,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
  ) {}

  ngOnInit() {
    this.getHomes();
    this.getIdForUpdate();
  }

  getIdForUpdate() {
    // se obtiene idForUpdate desde servicio
    this.subscription = this.itemService.currentId.subscribe((currentId) => {
      this.idForUpdate = currentId;

      // se comprueba si se ha recibido el id de algún artículo
      if (currentId != 'default') {
        // se obtiene el artículo
        this.itemService.getItemById(this.idForUpdate).subscribe((res) => {
          const itemForUpdate: ItemInterface = res;

          // convertir purchase_date para introducirlo como ion-datetime.
          if (itemForUpdate.purchase_date) {
            let date = itemForUpdate.purchase_date.$date;
            let date_string = this.datePipe.transform(date, 'yyyy-MM-dd');
            this.purchaseDatePicker = date_string;
          }

          // se pintan los datos en el formulario
          this.createItemForm.patchValue(itemForUpdate);
        });
      }
    });
  }

  updateItem() {
    /* Se crea objeto con los valores del formulario */
    let itemFormObject = this.createItemForm.getRawValue();

    // si purchase_date se ha modificado, se modifica el objeto
    if (this.purchaseDatePicker) {
      itemFormObject.purchase_date = this.purchaseDatePicker;
    }

    itemFormObject = this.cleanObject(itemFormObject);

    this.itemService.updateItem(this.idForUpdate, itemFormObject).subscribe((res) => {
      // restablecer id indicando valor por defecto
      this.itemService.setIdForUpdate('default');

      // se resetea el formulario
      this.createItemForm.reset();

      // redirigir a welcome, listado de artículos
      this.router.navigate(['/welcome']);
    });
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  createItem() {
    /* Se muestra aviso de carga */
    // this.showLoading();

    /* Se crea objeto con los valores del formulario */
    let itemFormObject = this.createItemForm.getRawValue();

    // si purchase_date se ha modificado, se modifica el objeto
    if (this.purchaseDatePicker) {
      itemFormObject.purchase_date = this.purchaseDatePicker;
    }

    // si item_color se ha modificado, se modifica el objeto
    if (this.itemSelectedColor !== 'Item color') {
      itemFormObject.color = this.itemSelectedColor;
    }

    /* Se limpia objeto, quitando valores nulos */
    itemFormObject = this.cleanObject(itemFormObject);

    /* Se crea artículo */
    this.itemService.createItem(itemFormObject).subscribe(
      (res) => {
        /* Se resetea el formulario y valores establecidos fuera del formulario */
        this.createItemForm.reset();
        this.purchaseDatePicker = undefined;
        this.itemSelectedColor = 'Item color';
        this.resetHome();
        this.getHomes();

        if (res.status === 'ERROR') {
          this.createItemError(res.response);
        } else {
          this.createItemOk(res.response);
        }

        /* Se elimina aviso de carga */
        // this.loading.dismiss();
      }
    );
  }

  cleanObject(objeto: object) {
    /* Se recorre el objeto para eliminar valores nulos */
    for (const key in objeto) {
      /* Si algún elemento raiz tiene valor nulo, se elimina */
      if (objeto[key] == null || objeto[key] == '') {
        delete objeto[key];
      }

      let element = objeto[key];
      /* Si algún subelemento tiene valor nulo, se elimina */
      for (let subElement in element) {
        if (element[subElement] == null || element[subElement] == '') {
          delete element[subElement];
        }
      }
    }

    /* Se existe purchase_date, se convierte de fecha a string */
    if (objeto['purchase_date']) {
      objeto['purchase_date'] = (objeto['purchase_date']).split('T')[0];
    }

    /* Se devuelve objeto sin valores nulos */
    return objeto;
  }

  /* -------------------- HOME -------------------- */

  /* Método que obtiene los hogares */
  getHomes() {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('token');

    if (jwt) {
      this.itemService.getHomes().subscribe((res) => {
        this.homesDescriptionsArray = res;
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

  /* Método que organiza los hogares en un array para el picker */
  organizeHomes() {
    let options = [];
    this.homesDescriptionsArray.forEach((x) => {
      options.push({ text: x.description, value: x });
    });
    return options;
  }

  /* picker de hogares */
  async pickerHomeDescriptions() {
    const picker = await this.pickerController.create({
      backdropDismiss: false,
      columns: [
        {
          name: 'description',
          options: this.organizeHomes(),
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {},
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            /* Se guarda el valor seleccionado */
            this.homeDescription = value.description.value.description;
            this.homeAddress = value.description.value.address;

            /* Restablecer valores para comenzar la búsqueda desde cero */
            this.resetRoom();
            this.resetContainer();
            this.resetCompartment();

            /* Obtener habitaciones correspondientes al hogar */
            this.getRooms();
          },
        },
      ],
    });

    await picker.present();
  }

  /* Método para resetear los valores de los hogares */
  resetHome() {
    this.homeDescription = undefined;
    this.homeAddress = undefined;
  }

  /* -------------------- ROOM -------------------- */

  /* Método que obtiene las habitaciones */
  getRooms() {
    let body: SearchDescriptionInterface = {
      description: this.homeDescription,
    };
    this.itemService.getRooms(body).subscribe((res) => {
      this.roomsArray = res;
    });
  }

  /* Método que organiza las habitaciones en un array para el picker */
  organizeRooms() {
    let options = [];
    this.roomsArray.forEach((x) => {
      options.push({ text: x.description, value: x });
    });
    return options;
  }

  /* picker de habitaciones */
  async pickerRooms() {
    const picker = await this.pickerController.create({
      backdropDismiss: false,
      columns: [
        {
          name: 'Rooms',
          options: this.organizeRooms(),
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {},
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            /* Se guarda el valor seleccionado */
            this.roomDescription = value.Rooms.value.description;
            this.roomFloor = value.Rooms.value.floor;

            /* Restablecer valores para comenzar la búsqueda desde cero */
            this.resetContainer();

            /* Obtener contenedores correspondientes a la habitación */
            this.getContainers();

            if (!this.movingView) {
              /* Restablecer valores para comenzar la búsqueda desde cero */
              this.resetCompartment();
            }

            // if (!this.movingView) {
            //   /* Restablecer valores para comenzar la búsqueda desde cero */
            //   this.resetContainer();
            //   this.resetCompartment();

            //   /* Obtener contenedores correspondientes a la habitación */
            //   this.getContainers();
            // }
          },
        },
      ],
    });

    await picker.present();
  }

  /* Método para resetear los valores de las habitaciones */
  resetRoom() {
    this.roomDescription = null;
    this.roomFloor = undefined;
  }

  /* -------------------- CONTAINER -------------------- */

  /* Método que obtiene los contenedores */
  getContainers() {
    let body: any = {
      home: this.homeDescription,
      room: this.roomDescription,
    };

    this.itemService.getContainers(body).subscribe((res) => {
      this.containersArray = res;
    });
  }

  /* Método que organiza las habitaciones en un array para el picker */
  organizeContainers() {
    let options = [];
    this.containersArray.forEach((x) => {
      options.push({ text: x.description, value: x });
    });
    return options;
  }

  /* picker de contenedores */
  async pickerContainers() {
    const picker = await this.pickerController.create({
      backdropDismiss: false,
      columns: [
        {
          name: 'Description',
          options: this.organizeContainers(),
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {},
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            /* Se guarda el valor seleccionado */
            this.containerDescription = value.Description.value.description;
            this.containerColor = value.Description.value.color;

            if (!this.movingView) {
              /* Restablecer valores para comenzar la búsqueda desde cero */
              this.resetCompartment();

              /* Obtener habitaciones correspondientes al hogar */
              this.getCompartments();
            }
          },
        },
      ],
    });

    await picker.present();
  }

  /* Método para resetear los valores de los contenedores */
  resetContainer() {
    this.containerDescription = null;
    this.containerColor = null;
  }

  /* -------------------- COMPARTMENT -------------------- */

  /* Método que obtiene los compartimentos */
  getCompartments() {
    let body: any = {
      home: this.homeDescription,
      room: this.roomDescription,
      container: this.containerDescription,
    };

    this.itemService.getCompartments(body).subscribe((res) => {
      this.compartmentsArray = res;
    });
  }

  /* Método que organiza los compartimentos en un array para el picker */
  organizeCompartments() {
    let options = [];
    this.compartmentsArray.forEach((x) => {
      options.push({ text: `${x.row}-${x.column}`, value: x });
    });
    return options;
  }

  /* picker de compartimentos */
  async pickerCompartments() {
    const picker = await this.pickerController.create({
      backdropDismiss: false,
      columns: [
        {
          name: 'Description',
          options: this.organizeCompartments(),
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {},
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            this.compartmentRow = value.Description.value.row;
            this.compartmentColumn = value.Description.value.column;
          },
        },
      ],
    });

    await picker.present();
  }

  /* Método para resetear los valores de los compartimentos */
  resetCompartment() {
    this.compartmentRow = null;
    this.compartmentColumn = null;
  }

  /* -------------------- OTHERS -------------------- */

  showLoading() {
    this.presentLoading();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    // this.loading.dismiss();
    return await this.loading.dismiss();
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

  async colorActionSheet() {
    const itemColorObject = document.querySelector('.itemColor');

    const actionSheet = await this.actionSheetController.create({
      header: 'Items actions',
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Amarillo',
          cssClass: 'iconColorYellow',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'amarillo';
            itemColorObject.classList.add('iconColorYellow');
          },
        },
        {
          text: 'Azul',
          cssClass: 'iconColorBlue',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'azul';
            itemColorObject.classList.add('iconColorBlue');
          },
        },
        {
          text: 'Rosa',
          cssClass: 'iconColorPink',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'rosa';
            itemColorObject.classList.add('iconColorPink');
          },
        },
        {
          text: 'Verde',
          cssClass: 'iconColorGreen',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'verde';
            itemColorObject.classList.add('iconColorGreen');
          },
        },
        {
          text: 'Blanco',
          cssClass: 'iconColorWhite',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'blanco';
            itemColorObject.classList.add('iconColorWhite');
          },
        },
        {
          text: 'Rojo',
          cssClass: 'iconColorRed',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'rojo';
            itemColorObject.classList.add('iconColorRed');
          },
        },
        {
          text: 'Naranja',
          cssClass: 'iconColorOrange',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'naranja';
            itemColorObject.classList.add('iconColorOrange');
          },
        },
        {
          text: 'Morado',
          cssClass: 'iconColorPurple',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'morado';
            itemColorObject.classList.add('iconColorPurple');
          },
        },
        {
          text: 'Gris',
          cssClass: 'iconColorGray',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'gris';
            itemColorObject.classList.add('iconColorGray');
          },
        },
        {
          text: 'Negro',
          cssClass: 'iconColorBlack',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'negro';
            itemColorObject.classList.add('iconColorBlack');
          },
        },
        {
          text: 'Dorado',
          cssClass: 'iconColorGold',
          icon: 'ellipse',
          handler: () => {
            this.removeColorClass();
            this.itemSelectedColor = 'dorado';
            itemColorObject.classList.add('iconColorGold');
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

  showColorActionsheet() {
    this.colorActionSheet();
  }

  removeColorClass() {
    const itemColorObject = document.querySelector('.itemColor');
    itemColorObject.classList.remove(
      'iconColorYellow',
      'iconColorBlue',
      'iconColorPink',
      'iconColorGreen',
      'iconColorWhite',
      'iconColorRed',
      'iconColorOrange',
      'iconColorPurple',
      'iconColorGray',
      'iconColorBlack',
      'iconColorGold'
    );
  }

  resetItemColor() {
    this.itemSelectedColor = 'Item color';
  }

  /* Alerta con mensaje de error */
  async createItemError(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-danger',
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /* Alerta con mensaje de bienvenida */
  async createItemOk(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-ok',
      header: 'Perfect!',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  checkMovingView() {
    if (this.movingView) {
      this.homeDescription = 'moving';
      this.compartmentColumn = 'mv';
      this.compartmentRow = 'mv';
      this.getRooms();
    } else {
      this.resetHome();
      this.roomsArray = [];
      this.compartmentColumn = undefined;
      this.compartmentRow = undefined;
    }
  }

  // testObject() {
  //   console.log('log object');
  //   console.log(this.createItemForm.getRawValue());
  // }

  // testReset() {
  //   console.log('log reset room');
  //   this.resetRoom();
  // }

  // testItemColor() {
  //   const itemColorObject = document.querySelector('.itemColor');
  //   console.log(itemColorObject);
  // }

}
