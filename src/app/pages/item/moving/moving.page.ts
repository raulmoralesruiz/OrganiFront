import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-moving',
  templateUrl: './moving.page.html',
  styleUrls: ['./moving.page.scss'],
})
export class MovingPage implements OnInit {

  selectedColor: string;

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color',
    cssClass: 'my-custom-class',
  };

  constructor(private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async presentActionSheet() {
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
            this.selectedColor = 'amarillo';
            console.log(this.selectedColor);
          },
        },
        {
          text: 'Azul',
          cssClass: 'iconColorBlue',
          icon: 'ellipse',
          handler: () => {
            console.log(this.selectedColor);
          },
        },
        {
          text: 'Rosa',
          cssClass: 'iconColorPink',
          icon: 'ellipse',
          handler: () => {},
        },
        {
          text: 'Verde',
          cssClass: 'iconColorGreen',
          icon: 'ellipse',
          handler: () => {},
        },
        {
          text: 'Blanco',
          cssClass: 'iconColorWhite',
          icon: 'ellipse',
          handler: () => {},
        },
        {
          text: 'Rojo',
          cssClass: 'iconColorRed',
          icon: 'ellipse',
          handler: () => {},
        },
        {
          text: 'Naranja',
          cssClass: 'iconColorOrange',
          icon: 'ellipse',
          handler: () => {},
        },
        {
          text: 'Morado',
          cssClass: 'iconColorPurple',
          icon: 'ellipse',
          handler: () => {},
        },
        {
          text: 'Gris',
          cssClass: 'iconColorGray',
          icon: 'ellipse',
          handler: () => {},
        },
        {
          text: 'Negro',
          cssClass: 'iconColorBlack',
          icon: 'ellipse',
          handler: () => {},
        },
        {
          text: 'Dorado',
          cssClass: 'iconColorGold',
          icon: 'ellipse',
          handler: () => {},
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

}
