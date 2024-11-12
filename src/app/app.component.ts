import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { Component, ElementRef, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoaderComponent } from './modules/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoaderComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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

  private    _http : HttpClient

  constructor(private elementRef: ElementRef,private http: HttpClient) {
    let apiUrl = this.elementRef.nativeElement.getAttribute('apiUrl');
    if (apiUrl != undefined && apiUrl != null)
      Common.rootBaseUrl = apiUrl;
     this._http = http;
  }
  public static rootBaseUrl: string = AppComponent.rootBaseUrl;
  public static defaultLang: string;
  private static jsonUrl = 'D:\Projects\ShopProductFront\ShopProduct\src\assets\config.json';

  private static getJsonData(): Observable<any> {
   const injector = Injector.create({
      providers: [
          { provide: HttpClient, deps: [HttpHandler] },
          { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest }) },
      ],
  });
    const httpClient: HttpClient = injector.get(HttpClient);

    return httpClient.get(this.jsonUrl);

  }

  public static ReadConfig(key : string) : any{

    debugger;
    this.getJsonData().subscribe(data=>{
      return data[key]
    });
  }


 


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
