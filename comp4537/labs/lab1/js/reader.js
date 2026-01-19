import { STRINGS } from "../lang/messages/en/user.js";
import { NotesManager } from "./notesManager.js";

export class Reader {
  // Initializes the Reader by loading and displaying notes
  constructor() {

    // set the title of the page
    document.title = STRINGS.READERPAGETITLE;

    // set up the back button
    const backBtn = document.getElementById("backBtn");
    backBtn.innerText = STRINGS.BACK;

    // Set up periodic refresh and display notes
    setInterval(() => {
      NotesManager.displayNotes(NotesManager.load(), null);
      NotesManager.updateTimestamp(STRINGS.UPDATED_AT);
    }, 2000);

    const removeCallback = null;

    // Load and display notes
    const notes = NotesManager.load();
    NotesManager.displayNotes(notes, removeCallback);
  }
}

new Reader();
