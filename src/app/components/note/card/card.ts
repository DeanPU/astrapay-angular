import { Component, input, output } from '@angular/core';
import { INoteData } from '../../../interface/note/note.interface';
import { formatDateNote } from '../../../utils/date.utils';

@Component({
  selector: 'app-note-card',
  imports: [],
  templateUrl: './card.html',
})
export class NoteCard {
  data = input<INoteData>();
  deleteItemEvent = output<number>();

  deleteItem(id: number) {
    this.deleteItemEvent.emit(id);
  }

  formatDate(date?: string) {
    return date ? formatDateNote(date) : '';
  }
}
