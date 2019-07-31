import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { AddcontactComponent } from '../addcontact/addcontact.component';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    private users: any;
    public contacts: any;
    public showAdd = false;

    constructor( private auth: AuthService, private request: RequestService, private router: Router, public dialog: MatDialog) { }

    ngOnInit() {
      this.request.getUser().subscribe((response) => {
        this.users = response;
        console.log(this.users);
      }, (error) => {
        console.log(error);
      });
    }
    deleteContact(id: any) {
      this.request.deleteContact(id).subscribe(res => {
        console.log(id);
        console.log('Deleted');
        this.viewContact();
      });
    }


    openDialog(user) {
      const dialogRef  =  this.dialog.open(UpdateComponent, {
        width: '400px',
        data: user
      });
      dialogRef.afterClosed().subscribe(result => {
        this.viewContact();
        console.log('The dialog was closed');
        // window.location.reload();
      });
    }
    onCreate() {
      const dialogRef = this.dialog.open(AddcontactComponent, {

      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    viewContact() {
      this.request.getUser().subscribe((response) => {
        this.users = response;
        console.log(this.users);
    });
    }
  }