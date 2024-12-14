import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from '../../../Services/popup.service';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
export class ProfileDetailComponent implements OnInit {


  constructor(private modalService : NgbModal,popup : PopupService){
    
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  openEditProfileModal(content : any){
    this.modalService.open(content)
  }
  closeEditProfileModal(content:any){
    this.modalService.dismissAll(content);  

  }

}
