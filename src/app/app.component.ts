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
    { title: 'Sign up', url: 'signup', icon: 'key' },
    { title: 'Login', url: 'login', icon: 'log-in' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
