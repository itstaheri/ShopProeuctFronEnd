import { Component } from '@angular/core';
import { SliderComponent } from '../elements/slider/slider.component';
import { MaincategoryComponent } from '../elements/category/maincategory/maincategory.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent,MaincategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

}
