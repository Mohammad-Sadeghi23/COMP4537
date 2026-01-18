// manages loading and saving notes to localStorage
export class NotesManager {
  static KEY = "notes";

  // Loads notes from localStorage, returns an array of note objects
  static load() {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  }

  // Saves the given array of note objects to localStorage
  static save(notes) {
    localStorage.setItem(this.KEY, JSON.stringify(notes));

    document.getElementById("timestamp").innerText =
      `Stored at: ${new Date().toLocaleTimeString()}`;
  }

  // Removes a note by its id and updates localStorage
  static removeById(id) {
    const notes = this.load();
    const updated = notes.filter((n) => n.id !== id);
    this.save(updated);
  }
}
