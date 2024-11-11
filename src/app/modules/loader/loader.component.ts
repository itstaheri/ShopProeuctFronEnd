import { Component } from '@angular/core';
import { LoaderService } from '../../Services/loader.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgxSpinnerModule,CommonModule ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  providers : [LoaderService]
})
export class LoaderComponent {
  typeSelected!: string;
  message: string = "درحال پردازش"

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private spinnerService: NgxSpinnerService,
    private loaderService: LoaderService){
      this.typeSelected = 'square-jelly-box';

      this.loaderService.isLoading.subscribe((res) => {
        if (this.isLoading)
        this.spinnerService.show();
      else
        this.spinnerService.hide();
      })
 
 
     }
    

}
