import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Note } from '../types/note.type';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {
  notes = signal<Note[]>([{ id: 0, description: 'Buy Milk' }]);

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  addNote() {
    const description = (
      document.getElementById('add-note') as HTMLInputElement
    )?.value;

    if (description) {
      const note: Note = {
        id: this.notes().length + 1,
        description: description,
      };
      this.notes.update((notes) => [...notes, note]);
    }
  }

  updateNote(event: Event, id: number) {
    this.notes.update((notes) => {
      let note = notes.find((n) => n.id === id);
      if (note) {
        note.description = (event.target as HTMLInputElement).value;
      }
      return notes;
    });
  }

  removeNote(index: number) {
    this.notes.update((notes) => notes.filter((n) => n.id !== index));
  }

  clearAllNotes() {
    this.notes.set([]);
  }
}
