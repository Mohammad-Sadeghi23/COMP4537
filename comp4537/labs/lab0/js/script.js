/*
AI Usage Disclosure:
ChatGPT (https://chat.openai.com/) was used to help understand assignment requirements,
debug JavaScript errors, and clarify object-oriented design concepts.
All code was written, reviewed, and fully understood by the student.
*/

import { UserInterface } from "./userInterface.js";
import { GameManager } from "./gameManager.js";

// initialize UI and GameManager
const ui = new UserInterface();
new GameManager(ui);
