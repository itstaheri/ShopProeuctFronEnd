import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoaderComponent } from './modules/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomPopupComponent } from './modules/popup/popup.component';
import { PopupService } from './Services/popup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoaderComponent,NgxSpinnerModule,CustomPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(CustomPopupComponent) popupComponent!: CustomPopupComponent;

  constructor(private popupService: PopupService){

  }
  ngAfterViewInit(): void {
    this.popupService.register(this.popupComponent);
  }
  title = 'ShopProduct';
  static rootBaseUrl: string = "https://localhost:7191/api";
  static Toastr:ToastrService;

}
export enum notificationType{
  success, error, info, warning
}

export enum getRequestDataType{
  allData ,
  relativeData ,
  notRelativeData,
  editMode,
  addMode
}
 
export enum formType{
  searchForm,
  browsingForm
}

export class Common {



  public static rootBaseUrl: string = AppComponent.rootBaseUrl;
  public static defaultLang: string;

 
 


    public static ShowNotify(type:notificationType,message?:string,title?:string){


        switch (type) {
          case notificationType.success:
            if (message == null || message == '') {
              if(this.defaultLang == 'fa'){
                  message = "عملیات با موفقیت انجام شد...";
              } else {
                  message = "operation was done successfully";
              }
            }
            AppComponent.Toastr.success(title,message);
          break;
          case notificationType.error:
            if (message == null || message == '') {
              if(this.defaultLang == 'fa'){
                message = "عملیات با خطا مواجه گردید...";
            } else {
                message = "operation encountered an error";
            }
            }
            AppComponent.Toastr.error(title,message);
          break;
          case notificationType.info:
            AppComponent.Toastr.info(title,message);
          break;
          case notificationType.warning:
            AppComponent.Toastr.warning(title,message);
          break;
      }

    }



    public static agGridConfig={
        rowSelection : {
            single : "single" ,
            multiple : "multiple"
        },
        columnTypes : {
            checkColumn: { resizable: false , filter: false ,checkboxSelection: true, lockPosition:true },
            menuColumn: { resizable: false , filter: false }
        },
        defaultColDef : { flex: 1, resizable: true, filter: false, sortable: true },
        rowModelType : 'infinite' ,
        serverSideStoreType : 'partial' ,
        paginationPageSize : {
          allMode: 20,
          relative:12,
          editMode: 10
        },
        cacheBlockSize : {
          allMode: 20,
          relative:12,
          editMode: 10
        },
        //ServerSide Pagination Options
        cacheOverflowSize : 2,
        maxConcurrentDatasourceRequests : 2,
        infiniteInitialRowCount : 2
    };

  

    public static breadcrumb = [];

    public static AppVersion: string = '0.0.1';


}
