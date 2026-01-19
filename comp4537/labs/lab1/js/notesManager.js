/* 
ChatGPT was used to help generate and debug parts of this code, and to simplify lab requirements. 
I understand every line of the code I submitted. 
*/

import { STRINGS } from "../lang/messages/en/user.js";
import { Note } from "./note.js";

// manages loading and saving notes to localStorage
export class NotesManager {
  static KEY = STRINGS.NOTES_KEY;

  // Loads notes from localStorage, returns an array of note objects
  static load() {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  }

  // Saves the given array of note objects to localStorage
  static save(notes) {
    localStorage.setItem(this.KEY, JSON.stringify(notes));
  }

  // Displays all notes from localStorage
  static displayNotes(notes, removeCallback) {
    // Clear existing notes
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    // Create and mount each note
    notes.forEach((noteData, index) => {
      const note = new Note(index, noteData, removeCallback);
      note.mount(container);
    });
  }

  static updateTimestamp(text) {
    // Update timestamp
    document.getElementById("timestamp").innerText =
      `${text} ${new Date().toLocaleTimeString()}`;
  }
}
