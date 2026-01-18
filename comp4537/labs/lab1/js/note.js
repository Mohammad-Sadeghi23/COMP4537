// Represents a single note with text area and remove button
export class Note {
  // Creates a Note instance with given id, text, and remove callback
  // and sets up the DOM elements
  constructor(id, text, removeCallback) {
    this.textArea = document.createElement("textarea");
    this.textArea.value = text;
    this.textArea.className = "note";

    this.removeBtn = document.createElement("button");
    this.removeBtn.innerText = "Remove";
    this.removeBtn.onclick = () => removeCallback(id);

    this.row = document.createElement("div");
    this.row.className = "note-row";
    this.row.append(this.textArea, this.removeBtn);
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
