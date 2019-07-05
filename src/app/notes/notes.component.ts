import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NoteDataService } from '../note-data.service';
import { Note } from '../model/note';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  modalRef: MDBModalRef;
  notes: Note;
  deleted = false;
  updated = false;

  currentUser: User;

  modalOptions = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true
  }

  constructor(private nds: NoteDataService, private modalService: MDBModalService, private authService: AuthService) { }

  ngOnInit() {
    this.showNotes();
    this.setUser();
  }

  setUser() {
    this.authService.getUser()
    .subscribe(
      (data:User) => this.currentUser = data,
      error => {console.log(error)}
      
      );
  }

  showNotes() {
    return this.nds.getAll().subscribe(
      (data:Note) => this.notes = data,
      error => console.log(error)
    );
  }

  deleteNote(id: number) {
    if(confirm('Are you sure?')){
      this.nds.destroyNote(id).subscribe(
        data => {
          this.deleted = true;
          this.showNotes();
        }
        

      );
    }

  }

  onRemove(event: Event, id: number) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.deleteNote(id);
    
  }


  closeAlert() {
    this.deleted = false;
    this.updated = false;
  }

  openModal(note: any) {
    //console.log(note);
    this.modalOptions["data"] = {note};
    this.modalRef = this.modalService.show(EditNoteComponent,  this.modalOptions);

    this.modalRef.content.action.subscribe( (result: boolean) => { this.updated = result; this.showNotes(); });
  }

}
