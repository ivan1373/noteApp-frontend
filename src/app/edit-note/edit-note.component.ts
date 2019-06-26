import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteDataService } from '../note-data.service';
import { Note } from '../model/note';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  notesForm: FormGroup;
  note: Note;

  modalRef: MDBModalRef;

  constructor(private formBuilder: FormBuilder, private nds: NoteDataService, private modalService: MDBModalService) { }

  ngOnInit() {
    this.notesForm = this.formBuilder.group({
      title: [this.note.title, Validators.required],
      content: [this.note.content, Validators.required]
  });
  }

  get f() { return this.notesForm.controls; }

  updateNote() {
    console.log(this.notesForm.value);
  }

  hide() {
    this.modalService.hide(1);
  }

}
