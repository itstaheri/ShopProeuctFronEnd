import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../Services/api.service';
import { ApiUrls } from '../../../../apiurls';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maincategory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maincategory.component.html',
  styleUrl: './maincategory.component.scss'
})
export class MaincategoryComponent implements OnInit {

  public categoryList! :any[]
  constructor(private callApi : ApiService){


  }
  ngOnInit(): void {

    this.GetMainCategories()
    
  } 
  GetMainCategories(){
    this.callApi.CallGetApi(ApiUrls.Category.GetMainCategoryList).subscribe(response=>{
      this.categoryList  = response.result;
      console.log(this.categoryList)
     
    })
  }
  

}
