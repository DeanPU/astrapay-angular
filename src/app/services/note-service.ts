import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INoteData, INoteRequestBody } from '../interface/note/note.interface';
import { IBaseResponse } from '../interface/api/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private baseUrl = 'http://localhost:8000/restv1/api';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<IBaseResponse<INoteData[]>> {
    return this.http.get<IBaseResponse<INoteData[]>>(this.baseUrl + '/note');
  }

  addNote(request: INoteRequestBody): Observable<IBaseResponse<INoteData>> {
    return this.http.post<IBaseResponse<INoteData>>(this.baseUrl + '/note', request);
  }

  deleteNote(id: number): Observable<IBaseResponse<number>> {
    return this.http.delete<IBaseResponse<number>>(this.baseUrl + `/note/${id}`);
  }
}
