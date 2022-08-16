import { Component, Input } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public storeService: StoreService) {}
}
