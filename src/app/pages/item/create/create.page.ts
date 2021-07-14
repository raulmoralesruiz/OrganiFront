import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, PickerController } from '@ionic/angular';
import { ItemInterface } from '../models/item.interface';
import { ItemService } from '../services/item.service';
import { element } from 'protractor';

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
    purchase_date: new FormControl(null, []),
    // item_purchase_date: new FormControl(null),
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

  homes: any;
  homeDescription: any;
  homeAddress: any;

  rooms: any;
  roomDescription: any;

  /* Arrays de contenedores obtenidos del servidor */
  containersDescriptionsArray: any;
  containersColorsArray: any;
  /* Variables que almacenan el valor del picker seleccionado */
  containerDescription: any;
  containerColor: any;

  /* Opciones del picker de fecha */
  datePickerOptions = {
    // Propiedad que obliga al usuario a utilizar los botones del picker
    backdropDismiss: false,
  };

  constructor(
    private itemService: ItemService,
    private loadingController: LoadingController,
    private pickerController: PickerController
  ) {}

  ngOnInit() {
    this.getHomes();
    this.getRooms();
    this.getContainers();
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

      console.log(response);

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

  getHomes() {
    this.itemService.getHomes().subscribe((res) => {
      this.homes = res;
    });
  }

  getHomeDescriptions() {
    let options = [];
    this.homes.forEach((x) => {
      options.push({ text: x.description, value: x.description });
    });
    return options;
  }

  getHomeAddresses() {
    let options = [];
    this.homes.forEach((x) => {
      options.push({ text: x.address, value: x.address });
    });
    return options;
  }

  async pickerHomes() {
    const picker = await this.pickerController.create({
      backdropDismiss: false,
      columns: [
        {
          name: 'Description',
          options: this.getHomeDescriptions(),
        },
        {
          name: 'Address',
          options: this.getHomeAddresses(),
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
            this.homeDescription = value.Description.value;
            this.homeAddress = value.Address.value;
          },
        },
      ],
    });

    await picker.present();
  }

  getRooms() {
    this.itemService.getRooms().subscribe((res) => {
      this.rooms = res;
    });
  }

  getRoomDescriptions() {
    let options = [];
    this.rooms.forEach((x) => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  async pickerRooms() {
    const picker = await this.pickerController.create({
      backdropDismiss: false,
      columns: [
        {
          name: 'Rooms',
          options: this.getRoomDescriptions(),
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
            this.roomDescription = value.Rooms.value;
          },
        },
      ],
    });

    await picker.present();
  }

  getContainers() {
    this.itemService.getContainerDescriptions().subscribe((res) => {
      this.containersDescriptionsArray = res;
    });

    this.itemService.getContainerColors().subscribe((res) => {
      this.containersColorsArray = res;
    });
  }

  getContainerDescriptions() {
    let options = [];
    this.containersDescriptionsArray.forEach((x) => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  getContainerColors() {
    let options = [];
    this.containersColorsArray.forEach((x) => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  async pickerContainers() {
    const picker = await this.pickerController.create({
      backdropDismiss: false,
      columns: [
        {
          name: 'Description',
          options: this.getContainerDescriptions(),
        },
        {
          name: 'Color',
          options: this.getContainerColors(),
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
            this.containerDescription = value.Description.value;
            this.containerColor = value.Color.value;
          },
        },
      ],
    });

    await picker.present();
  }

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