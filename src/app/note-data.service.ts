import { Injectable } from '@angular/core';
import { Note } from './model/note';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteDataService {
  ROOT_URL = 'http://127.0.0.1:8000/api/v1/notes';

  constructor(private http: HttpClient) { }

  
  

  store(title: string, content: string) {
    return this.http.post<Note>(`${this.ROOT_URL}/create`, { title, content });
  }

  getAll(): Observable<Note>{
    return this.http.get<Note>(this.ROOT_URL);
  }

  show(id: number) {
    return this.http.get<Note>(`${this.ROOT_URL}/${id}`);
  }

  destroyNote(id: number): Observable<{}> {
    return this.http.delete(`${this.ROOT_URL}/${id}`);
  }
}
