import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
} from '@angular/core';
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
  public notes = signal<Note[]>([{ id: 0, description: 'Thingamajig' }]);
  public counter = computed(async () => {
    return this.notes().length;
  });
  constructor(private readonly _cdr: ChangeDetectorRef) {}

  addNote() {
    const description = (
      document.getElementById('add-widget') as HTMLInputElement
    )?.value;

    if (description) {
      const notes: Note = {
        id: this.notes().length + 1,
        description: description,
      };
      this.notes.update((notes: any) => [...notes, notes]);
    }
  }

  updateNote(event: Event, id: number) {
    this.notes.mutate(async (notes: any[]) => {
      let note = notes.find((w: { id: number }) => w.id === id);
      if (note) {
        note.description = (event.target as HTMLInputElement).value;
      }
    });
  }

  removeNote(index: number) {
    this.notes.update(
      (notes: any[]) =>
        (notes = notes.filter((n: { id: number }) => n.id !== index))
    );
  }

  clearAllNotes() {
    this.notes.set([]);
  }
}
