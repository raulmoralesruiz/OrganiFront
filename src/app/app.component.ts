import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Welcome', url: 'welcome', icon: 'search' },
    { title: 'New item', url: 'create', icon: 'add-circle' },
    // { title: 'Show all items', url: 'show-all', icon: 'albums' },
    // { title: 'Sign up', url: 'signup', icon: 'log-in' },
    { title: 'Login', url: 'login', icon: 'key' },
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}