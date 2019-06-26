import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteDataService } from '../note-data.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  notesForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private nds: NoteDataService) { }

  ngOnInit() {
    this.notesForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
  });
  }

  toNotes() {
    this.router.navigate(['/notes']);
  }

  get f() { return this.notesForm.controls; }

  createNote() {
    if (this.notesForm.invalid) {
      return;
    }
    
    
    this.nds.store(this.f.title.value, this.f.content.value).subscribe(
      data =>{
        this.submitted = true;
        this.notesForm.reset();
      } 
    );

  }

  closeAlert() {
    this.submitted = false;
  }

}
