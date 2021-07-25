import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, PickerController } from '@ionic/angular';
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
  purchaseDate: any;

  /* Opciones del picker de fecha */
  datePickerOptions = {
    backdropDismiss: false,
  };

  idForUpdate:string;
  subscription: Subscription;

  constructor(
    private itemService: ItemService,
    private loadingController: LoadingController,
    private pickerController: PickerController,
    private datePipe: DatePipe,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getHomes();
    this.getIdForUpdate();
  }

  testDate() {
    console.log(this.purchaseDate);
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
          console.log(res);

          // convertir purchase_date para introducirlo como ion-datetime.
          if (itemForUpdate.purchase_date) {
            // let date = itemForUpdate.purchase_date.$date;
            // let date_string = this.datePipe.transform(date, 'yyyy-MM-dd');
            // this.purchaseDate = date_string;
            delete itemForUpdate.purchase_date;
            // itemForUpdate.purchase_date.$date = new Date(date_string);
          }

          if (this.purchaseDate) {
            
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
    itemFormObject = this.cleanObject(itemFormObject);

    this.itemService.updateItem(this.idForUpdate, itemFormObject).subscribe((res) => {
      console.log(res);

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

    /* Se limpia objeto, quitando valores nulos */
    itemFormObject = this.cleanObject(itemFormObject);

    /* Se crea artículo */
    this.itemService.createItem(itemFormObject).subscribe((response) => {
      /* Se resetea el formulario */
      this.createItemForm.reset();

      /* Se elimina aviso de carga */
      // this.loading.dismiss();
    });
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
      objeto['purchase_date'] = this.createItemForm.value.purchase_date.split('T')[0];
    }

    /* Se devuelve objeto sin valores nulos */
    return objeto;
  }

  /* -------------------- HOME -------------------- */

  /* Método que obtiene los hogares */
  getHomes() {
    this.itemService.getHomes().subscribe((res) => {
      this.homesDescriptionsArray = res;
    });
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
            this.getRooms()
          },
        },
      ],
    });

    await picker.present();
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
            this.resetCompartment();

            /* Obtener contenedores correspondientes a la habitación */
            this.getContainers()
          },
        },
      ],
    });

    await picker.present();
  }

  /* Método para resetear los valores de las habitaciones */
  resetRoom() {
    this.roomDescription = null;
    this.roomFloor = null;
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

            /* Restablecer valores para comenzar la búsqueda desde cero */
            this.resetCompartment();

            /* Obtener habitaciones correspondientes al hogar */
            this.getCompartments()
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
}