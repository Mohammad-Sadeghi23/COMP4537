import { NotesManager } from "./notesManager.js";
import { STRINGS } from "../lang/messages/en/user.js";

export class Writer {
  // Initializes the Writer by loading and displaying notes
  constructor() {

    // set the title of the page
    document.title = STRINGS.WRITERPAGETITLE;

    // Set up the save button
    const saveBtn = document.getElementById("saveNoteBtn");
    saveBtn.innerText = STRINGS.ADD;
    saveBtn.onclick = Writer.saveNote;

    // set up the back button
    const backBtn = document.getElementById("backBtn");
    backBtn.innerText = STRINGS.BACK;

    // Load and display notes
    const notes = NotesManager.load();
    NotesManager.displayNotes(notes, Writer.removeNote);

    // Set up periodic refresh and saves notes
    setInterval(() => {
      Writer.refreshNotes();
      NotesManager.updateTimestamp(STRINGS.STORED_AT);
    }, 2000);
  }

  // Removes a note by its id and refreshes the displayed notes
  static removeNote(index) {
    const notes = NotesManager.load();
    notes.splice(index, 1); // remove by position
    NotesManager.save(notes);
    NotesManager.displayNotes(notes, Writer.removeNote);
  }

  // Refreshes the displayed notes from localStorage
  static refreshNotes() {
    // Clear existing notes
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    // Load and display notes
    const notes = NotesManager.load();
    NotesManager.displayNotes(notes, Writer.removeNote);
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

    // refresh displayed notes
    NotesManager.displayNotes(notes, Writer.removeNote);
  }
}

new Writer();
