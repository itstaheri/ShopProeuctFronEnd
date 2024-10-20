import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ShopProduct';
  static rootBaseUrl: string = "https://localhost:7169/api";
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

  constructor(private elementRef: ElementRef) {



    let apiUrl = this.elementRef.nativeElement.getAttribute('apiUrl');
    if (apiUrl != undefined && apiUrl != null)
      Common.rootBaseUrl = apiUrl;


  
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

    public static UrlLists = {
        "IsAuthenticate": "/User/Login",
        "ChangePassword" : "/Authentication/ChangePassword",
        "CheckIsValidCode" : "/Authentication/CheckIsValidCode",

        "SignupUser": "/Customer/SignupUser",
        "ReturnUserInfo": "/Customer/ReturnUserInfo",
        "ReturnCustomerDetail": "/Customer/ReturnCustomerDetail",
        "CheckEmailExist": "/Customer/CheckEmailExist",
        "ReturnDisableParts": "/Customer/ReturnDisableParts",
        "ReturnUserInfoWithEmail": "/Customer/ReturnUserInfoWithEmail",
        "ChangePasswordStartWorkflow": "/Customer/ChangePasswordStartWorkFlow",
        "NewCount": "/Customer/ReturnVariableNewCount",
        "CheckEmailExistWithGuid": "/Customer/CheckEmailExistWithGuid",
        "ReturnUserInfoWithGuid": "/Customer/ReturnUserInfoWitGuid",

        "GetSiteLogoAndCaption":"/Environment/GetSiteLogoAndCaption",

        "ResetPassword":"/User/ResetPassword",

        "FileManager": "/FileManager/UploadFile",
        "FileDownload":"/FileManager/DownloadFile",

        "StartWorkFlow" : "/WorkFlow/StartWorkFlow",
        "DoneTask" : "/WorkFlow/DoneTask",
        "GetCustomerClubeUnreadMessage" : "/CustomerClube/GetCustomerClubeUnreadMessage",
        "UpdateCustomerClubeMessageStatus" : "/CustomerClube/UpdateCustomerClubeMessageStatus",

         "GetRequestedOrganizationsType" : "/BaseInfo/GetRequestedOrganizationsType",
         "GetRequestedBaseOrganizations" : "/BaseInfo/GetRequestedBaseOrganizations",
         "SubmitCertificateCode" : "/CertificateCode/SubmitCertificateCode",

         "GetCaptcha" : "/Captcha/GetCaptcha",
         "CheckCaptchaValid" : "/Captcha/CheckCaptchaValid",

         "GetEducationcertificateBaseDate" : "/Educationcertificate/GetEducationcertificateBaseDate",
         "GetUserProfile" : "/User/GetUserProfile",
         "GetAllBaseDataEducationCertificate" : "/Educationcertificate/GetAllBaseData",

         "ActivitiesInStudentInstitutions": {
          "Insert": "/ActivitiesInStudentInstitutions_ElectedStudent/Insert",
          "Update": "/ActivitiesInStudentInstitutions_ElectedStudent/Update",
          "Delete": "/ActivitiesInStudentInstitutions_ElectedStudent/Delete",
          "GetById": "/ActivitiesInStudentInstitutions_ElectedStudent/GetById",
          "GetAll": "/ActivitiesInStudentInstitutions_ElectedStudent/GetAll",
          "GetAllBaseData": "/ActivitiesInStudentInstitutions_ElectedStudent/GetAllBaseData"
         },
         "Article": {
          "Insert": "/Articles_ElectedStudent/Insert",
          "Update": "/Articles_ElectedStudent/Update",
          "Delete": "/Articles_ElectedStudent/Delete",
          "GetById": "/Articles_ElectedStudent/GetById",
          "GetAll": "/Articles_ElectedStudent/GetAll",
          "GetAllBaseData": "/Articles_ElectedStudent/GetAllBaseData"
         },
         "CompetitionsAndScientificFestivals": {
          "Insert": "/CompetitionsAndScientificFestivals_ElectedStudent/Insert",
          "Update": "/CompetitionsAndScientificFestivals_ElectedStudent/Update",
          "Delete": "/CompetitionsAndScientificFestivals_ElectedStudent/Delete",
          "GetById": "/CompetitionsAndScientificFestivals_ElectedStudent/GetById",
          "GetAll": "/CompetitionsAndScientificFestivals_ElectedStudent/GetAll",
          "GetAllBaseData": "/CompetitionsAndScientificFestivals_ElectedStudent/GetAllBaseData"
         },
         "CompilationBooks": {
          "Insert": "/CompilationBooks_ElectedStudent/Insert",
          "Update": "/CompilationBooks_ElectedStudent/Update",
          "Delete": "/CompilationBooks_ElectedStudent/Delete",
          "GetById": "/CompilationBooks_ElectedStudent/GetById",
          "GetAll": "/CompilationBooks_ElectedStudent/GetAll",
          "GetAllBaseData": "/CompilationBooks_ElectedStudent/GetAllBaseData"
         },
         "CurrentCourseInformation": {
          "Insert": "/CurrentCourseInformation_ElectedStudent/Insert",
          "Update": "/CurrentCourseInformation_ElectedStudent/Update",
          "Delete": "/CurrentCourseInformation_ElectedStudent/Delete",
          "GetById": "/CurrentCourseInformation_ElectedStudent/GetById",
          "GetAll": "/CurrentCourseInformation_ElectedStudent/GetAll",
          "GetAllBaseData": "/CurrentCourseInformation_ElectedStudent/GetAllBaseData"
         },
         "Disability": {
          "Insert": "/Disability_ElectedStudent/Insert",
          "Update": "/Disability_ElectedStudent/Update",
          "Delete": "/Disability_ElectedStudent/Delete",
          "GetById": "/Disability_ElectedStudent/GetById",
          "GetAll": "/Disability_ElectedStudent/GetAll",
          "GetAllBaseData": "/Disability_ElectedStudent/GetAllBaseData"
         },
         "Education": {
          "Insert": "/EventType_ElectedStudent/Insert",
          "Update": "/EventType_ElectedStudent/Update",
          "Delete": "/EventType_ElectedStudent/Delete",
          "GetById": "/EventType_ElectedStudent/GetById",
          "GetAll": "/EventType_ElectedStudent/GetAll",
          "GetAllBaseData": "/EventType_ElectedStudent/GetAllBaseData"
         },
         "EpiscopalRecords": {
          "Insert": "/EpiscopalRecords_ElectedStudent/Insert",
          "Update": "/EpiscopalRecords_ElectedStudent/Update",
          "Delete": "/EpiscopalRecords_ElectedStudent/Delete",
          "GetById": "/EpiscopalRecords_ElectedStudent/GetById",
          "GetAll": "/EpiscopalRecords_ElectedStudent/GetAll",
          "GetAllBaseData": "/EpiscopalRecords_ElectedStudent/GetAllBaseData"
         },
         "Honors": {
          "Insert": "/OtheHonors_ElectedStudent/Insert",
          "Update": "/OtheHonors_ElectedStudent/Update",
          "Delete": "/OtheHonors_ElectedStudent/Delete",
          "GetById": "/OtheHonors_ElectedStudent/GetById",
          "GetAll": "/OtheHonors_ElectedStudent/GetAll",
          "GetAllBaseData": "/OtheHonors_ElectedStudent/GetAllBaseData"
         },
         "InventionAndInnovation": {
          "Insert": "/InventionAndInnovation_ElectedStudent/Insert",
          "Update": "/InventionAndInnovation_ElectedStudent/Update",
          "Delete": "/InventionAndInnovation_ElectedStudent/Delete",
          "GetById": "/InventionAndInnovation_ElectedStudent/GetById",
          "GetAll": "/InventionAndInnovation_ElectedStudent/GetAll",
          "GetAllBaseData": "/InventionAndInnovation_ElectedStudent/GetAllBaseData"
         },
         "LiteraryAndArtistic": {
          "Insert": "/ArtisticActivities_ElectedStudent/Insert",
          "Update": "/ArtisticActivities_ElectedStudent/Update",
          "Delete": "/ArtisticActivities_ElectedStudent/Delete",
          "GetById": "/ArtisticActivities_ElectedStudent/GetById",
          "GetAll": "/ArtisticActivities_ElectedStudent/GetAll",
          "GetAllBaseData": "/ArtisticActivities_ElectedStudent/GetAllBaseData"
         },
         "OtherCulturalActivities": {
          "Insert": "/OtherCulturalActivities/Insert",
          "Update": "/OtherCulturalActivities/Update",
          "Delete": "/OtherCulturalActivities/Delete",
          "GetById": "/OtherCulturalActivities/GetById",
          "GetAll": "/OtherCulturalActivities/GetAll",
          "GetAllBaseData": "/OtherCulturalActivities/GetAllBaseData",
          "GetSubjectCulturalActivity": "/OtherCulturalActivities/GetSubjectCulturalActivity"
         },
         "Product": {
          "Insert": "/ProductName_ElectedStudent/Insert",
          "Update": "/ProductName_ElectedStudent/Update",
          "Delete": "/ProductName_ElectedStudent/Delete",
          "GetById": "/ProductName_ElectedStudent/GetById",
          "GetAll": "/ProductName_ElectedStudent/GetAll",
          "GetAllBaseData": "/ProductName_ElectedStudent/GetAllBaseData"
         },
         "QuranicActivities": {
          "Insert": "/QuranicActivities_ElectedStudent/Insert",
          "Update": "/QuranicActivities_ElectedStudent/Update",
          "Delete": "/QuranicActivities_ElectedStudent/Delete",
          "GetById": "/QuranicActivities_ElectedStudent/GetById",
          "GetAll": "/QuranicActivities_ElectedStudent/GetAll",
          "GetAllBaseData": "/QuranicActivities_ElectedStudent/GetAllBaseData"
         },
         "ResearchProjects": {
          "Insert": "/ResearchProjects_ElectedStudent/Insert",
          "Update": "/ResearchProjects_ElectedStudent/Update",
          "Delete": "/ResearchProjects_ElectedStudent/Delete",
          "GetById": "/ResearchProjects_ElectedStudent/GetById",
          "GetAll": "/ResearchProjects_ElectedStudent/GetAll",
          "GetAllBaseData": "/ResearchProjects_ElectedStudent/GetAllBaseData"
         },
         "LanguageTest": {
          "Insert": "/LanguageTest_ElectedStudent/Insert",
          "Update": "/LanguageTest_ElectedStudent/Update",
          "Delete": "/LanguageTest_ElectedStudent/Delete",
          "GetById": "/LanguageTest_ElectedStudent/GetById",
          "GetAll": "/LanguageTest_ElectedStudent/GetAll",
          "GetAllBaseData": "/LanguageTest_ElectedStudent/GetAllBaseData"
         },
         "ScientificOlympiad": {
          "Insert": "/ScientificOlympiad_ElectedStudent/Insert",
          "Update": "/ScientificOlympiad_ElectedStudent/Update",
          "Delete": "/ScientificOlympiad_ElectedStudent/Delete",
          "GetById": "/ScientificOlympiad_ElectedStudent/GetById",
          "GetAll": "/ScientificOlympiad_ElectedStudent/GetAll",
          "GetAllBaseData": "/ScientificOlympiad_ElectedStudent/GetAllBaseData"
         },
         "SportActivities": {
          "Insert": "/SportActivities_ElectedStudent/Insert",
          "Update": "/SportActivities_ElectedStudent/Update",
          "Delete": "/SportActivities_ElectedStudent/Delete",
          "GetById": "/SportActivities_ElectedStudent/GetById",
          "GetAll": "/SportActivities_ElectedStudent/GetAll",
          "GetAllBaseData": "/SportActivities_ElectedStudent/GetAllBaseData",
          "GetFieldOfstudySportsSecond": "/SportActivities_ElectedStudent/GetFieldOfstudySportsSecond"
         },
         "StudentPublications": {
          "Insert": "/StudentPublications_ElectedStudent/Insert",
          "Update": "/StudentPublications_ElectedStudent/Update",
          "Delete": "/StudentPublications_ElectedStudent/Delete",
          "GetById": "/StudentPublications_ElectedStudent/GetById",
          "GetAll": "/StudentPublications_ElectedStudent/GetAll",
          "GetAllBaseData": "/StudentPublications_ElectedStudent/GetAllBaseData"
         },
         "TechnologyIdea": {
          "Insert": "/TechnologyIdea_ElectedStudent/Insert",
          "Update": "/TechnologyIdea_ElectedStudent/Update",
          "Delete": "/TechnologyIdea_ElectedStudent/Delete",
          "GetById": "/TechnologyIdea_ElectedStudent/GetById",
          "GetAll": "/TechnologyIdea_ElectedStudent/GetAll",
          "GetAllBaseData": "/TechnologyIdea_ElectedStudent/GetAllBaseData"
         },
         "TechnologyUnit": {
          "Insert": "/TechnologyUnit_ElectedStudent/Insert",
          "Update": "/TechnologyUnit_ElectedStudent/Update",
          "Delete": "/TechnologyUnit_ElectedStudent/Delete",
          "GetById": "/TechnologyUnit_ElectedStudent/GetById",
          "GetAll": "/TechnologyUnit_ElectedStudent/GetAll",
          "GetAllBaseData": "/TechnologyUnit_ElectedStudent/GetAllBaseData"
         },

    }

}
