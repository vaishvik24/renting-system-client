import { Component } from '@angular/core';
import { AuthService} from './services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';

  getBackground() {
    return {'background-image': `url("http://www.givui.com/wp-content/uploads/d/d-natural-redwood-decking-redwood-trees-red-wood-table-redwood-tree-images-red-wood-stain-red-wood-stain-home-depot-red-wood-rising-redwood-restaurant-redwood-road-red-wood-ring-redwood-pla.jpg")`};
  }
}
