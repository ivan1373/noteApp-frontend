import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteDataService } from '../note-data.service';
import { Note } from '../model/note';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  notesForm: FormGroup;
  note: Note;

  modalRef: MDBModalRef;

  action = new Subject();

  constructor(private formBuilder: FormBuilder, private nds: NoteDataService, private modalService: MDBModalService) { }

  ngOnInit() {
    this.notesForm = this.formBuilder.group({
      title: [this.note.title, Validators.required],
      content: [this.note.content, Validators.required]
  });
  }

  get f() { return this.notesForm.controls; }

  editNote() {
    return this.nds.updateNote(this.f.title.value, this.f.content.value, this.note.id).subscribe((data:Note) => {
      this.note = data;
      this.action.next(true);
      this.hide();
    },
    error => {console.log(error);
              this.action.next(false);
            }
      );
  }

  hide() {
    this.modalService.hide(1);
  }

}
