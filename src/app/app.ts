import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteCard } from './components/note/card/card';
import { NotesFormComponent } from './components/note/form/form';
import { INoteRequestBody, INoteData } from './interface/note/note.interface';
import { NoteService } from './services/note-service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, NoteCard, NotesFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  isShowToast = signal(false);
  toastType: string = '';
  toastMessage: string = '';
  isLoading: boolean = true;
  notes: INoteData[] = [];
  deleteNoteId: number | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe({
      next: (res) => {
        this.notes = res.data;
        this.isLoading = false;
      },
      error: (e) => {
        this.toastMessage = e.message;
        this.toastType = 'alert alert-error';
        this.toggleToast();
        setTimeout(() => {
          this.toggleToast();
        }, 2000);
      },
    });
  }

  toggleToast() {
    this.isShowToast.update((isShowToast) => !isShowToast);
  }

  handleSubmit(payload: INoteRequestBody) {
    this.noteService.addNote(payload).subscribe({
      next: () => {
        this.isLoading = true;
        this.loadNotes();
        (document.getElementById('note_modal') as HTMLDialogElement).close();
      },
      error: (e) => {
        this.toastMessage = e.message;
        this.toastType = 'alert alert-error';
        this.toggleToast();
        setTimeout(() => this.toggleToast(), 2000);
      },
    });
  }

  handleDelete(id: number) {
    this.deleteNoteId = id;
    (document.getElementById('delete_modal') as HTMLDialogElement).showModal();
  }

  confirmDelete() {
    if (this.deleteNoteId === null) return;

    this.noteService.deleteNote(this.deleteNoteId).subscribe({
      next: () => {
        this.isLoading = true;
        this.loadNotes();
        this.deleteNoteId = null;
      },
      error: (e) => {
        this.toastMessage = e.message;
        this.toastType = 'alert alert-error';
        this.toggleToast();
        setTimeout(() => this.toggleToast(), 2000);
      },
    });
  }
}
