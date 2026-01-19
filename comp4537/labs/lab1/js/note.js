/* 
ChatGPT (https://chat.openai.com/ ) was used to help generate and debug parts of this code, and to simplify lab requirements. 
I understand every line of the code I submitted. 
*/

import { STRINGS } from "../lang/messages/en/user.js";

// Represents a single note with text area and remove button
export class Note {
  // Creates a Note instance with given id, text, and remove callback
  // and sets up the DOM elements
  constructor(id, text, removeCallback) {
    this.textArea = document.createElement("textarea");
    this.textArea.value = text;
    this.textArea.className = "note";

    // Set up remove button if callback is provided
    if (removeCallback) {
      this.removeBtn = document.createElement("a");
      this.removeBtn.innerText = STRINGS.REMOVE;
      this.removeBtn.className = "button";
      this.removeBtn.onclick = () => removeCallback(id);
    }

    // Create a container row for the note
    this.row = document.createElement("div");
    this.row.className = "note-row";

    // Append text area and remove button to the row
    this.row.append(this.textArea);
    if (this.removeBtn) this.row.append(this.removeBtn);
  }

  // Appends the note's DOM elements to the given parent element
  mount(parent) {
    parent.appendChild(this.row);
  }

  // Removes the note's DOM elements from the document
  destroy() {
    this.row.remove();
  }

  // Returns the current text content of the note
  getText() {
    return this.textArea.value;
  }
}
