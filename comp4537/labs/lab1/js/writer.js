import { NotesManager } from "./notesManager.js";
import { Note } from "./note.js";
import { STRINGS } from "../lang/messages/en/user.js";

export class Writer {
  // Initializes the Writer by loading and displaying notes
  constructor() {

    // Set up the save button
    const saveBtn = document.getElementById("saveNoteBtn");
    saveBtn.innerText = STRINGS.ADD;
    saveBtn.style.display = "block";
    saveBtn.onclick = Writer.saveNote;

    // Load and display notes
    const notes = NotesManager.load();
    Writer.displayNotes(notes);

    // Set up periodic refresh
    setInterval(Writer.refreshNotes, 2000);
  }

  // Displays all notes from localStorage
  static displayNotes(notes) {

    // Clear existing notes
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    // Create and mount each note
    notes.forEach((noteData, index) => {
      const note = new Note(index, noteData, Writer.removeNote);
      note.mount(container);
    });
  }

  // Removes a note by its id and refreshes the displayed notes
  static removeNote(index) {
    const notes = NotesManager.load();
    notes.splice(index); // remove by position
    NotesManager.save(notes);
    Writer.displayNotes(notes);
  }

  // Refreshes the displayed notes from localStorage and updates the timestamp
  static refreshNotes() {
    // Clear existing notes
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    // Update timestamp
    document.getElementById("timestamp").innerText =
      `Stored at: ${new Date().toLocaleTimeString()}`;

    // Load and display notes
    const notes = NotesManager.load();
    Writer.displayNotes(notes);
  }

  // Saves a new note to localStorage and refreshes the displayed notes
  static saveNote() {
    // get the note from the text area
    const content = document.getElementById("noteContent").value;
    if (!content.trim()) return; // Ignore empty notes

    // get existing notes
    const notes = NotesManager.load();

    // save the new note
    notes.push(content);

    // save to localStorage
    NotesManager.save(notes);
  }
}

new Writer();
