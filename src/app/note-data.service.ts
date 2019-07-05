import { Injectable } from '@angular/core';
import { Note } from './model/note';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteDataService {
  ROOT_URL = 'https://angularnote.herokuapp.com/api/v1/notes';

  constructor(private http: HttpClient) { }

  
  

  store(title: string, content: string) {
    return this.http.post<Note>(`${this.ROOT_URL}/create`, { title, content });
  }

  getAll(): Observable<Note>{
    return this.http.get<Note>(this.ROOT_URL);
  }

  updateNote (title: string, content: string, id: number): Observable<Note> {
    return this.http.put<Note>(`${this.ROOT_URL}/${id}/edit`, { title, content })
      .pipe(
        
      );
  }

  show(id: number) {
    return this.http.get<Note>(`${this.ROOT_URL}/${id}`);
  }

  destroyNote(id: number): Observable<{}> {
    return this.http.delete(`${this.ROOT_URL}/${id}`);
  }
}
