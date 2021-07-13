import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './services/welcome.service';
import { SearchDescriptionInterface } from './models/search_description.interface';
import { stringify } from '@angular/compiler/src/util';
import { ItemInterface } from './models/item.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  homes: any = [];

  itemDescription: string = '';
  itemsSearched: ItemInterface[] = [];
  detailsActivated: boolean = false;

  currentDisplayIndex: number = -1;

  constructor(private welcomeService: WelcomeService) {}

  ngOnInit() {}

  // getAllHomes() {
  //   this.welcomeService.getAllHomes().subscribe((res) => {
  //     this.homes = res;
  //     console.log(res);
  //   });
  // }

  getItemByDescription() {
    // Se define el objeto con la descripción a buscar
    let body: SearchDescriptionInterface = {
      description: this.itemDescription,
    };

    // Se comprueba si la descripción tiene al menos 3 caracteres
    if (body.description.length > 2) {
      // Se ejecuta la búsqueda
      this.welcomeService.getItemByDescription(body).subscribe((res) => {
        this.itemsSearched = res;
        console.log(res);
      });
    }
  }

  showHideDetails() {
    this.detailsActivated == false
      ? (this.detailsActivated = true)
      : (this.detailsActivated = false);
  }

  hide(index: number) {
    if (this.currentDisplayIndex == index) {
      this.currentDisplayIndex = -1; //Reset the index if the current item index is same as the item index passed on button click
      return; //Don't execute further
    }
    this.currentDisplayIndex = index; //Set the current index to the item index passed from template. If you click on item number 3, only 3rd item details will be visible
  }
}
