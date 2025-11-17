import { Component, input, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { INoteRequestBody } from '../../../interface/note/note.interface';

@Component({
  selector: 'app-notes-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
})
export class NotesFormComponent {
  submitNote = output<INoteRequestBody>();

  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (!this.noteForm.valid) return;
    this.submitNote.emit(this.noteForm.value as INoteRequestBody);
    this.noteForm.reset();
  }

  openModal() {
    (document.getElementById('note_form_modal') as HTMLDialogElement).showModal();
  }

  closeModal() {
    (document.getElementById('note_form_modal') as HTMLDialogElement).close();
  }
}
