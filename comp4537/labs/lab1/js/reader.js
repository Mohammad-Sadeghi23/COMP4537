/* 
ChatGPT (https://chat.openai.com/ ) was used to help generate and debug parts of this code, and to simplify lab requirements. 
I understand every line of the code I submitted. 
*/

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

    // Function to render notes and update timestamp, null removeCallback
    const render = () => {
      NotesManager.displayNotes(NotesManager.load(), null);
      NotesManager.updateTimestamp(STRINGS.UPDATED_AT);
    };

    // Initial render then periodic updates every 2 seconds
    render();
    setInterval(() => {
      render();
    }, 2000);
  }
}

new Reader();
