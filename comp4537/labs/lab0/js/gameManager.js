import { UserInterface } from "./userInterface.js";
import { Button } from "./button.js";
import { STRINGS } from "../lang/messages/en/strings.js";

export class GameManager {

  constructor(ui) {

    this.ui = ui;

    this.buttons = [];
    this.expectedOrder = 1;
    this.container = null;

    this.submitBtn = document.getElementById("submitButton");
    this.submitBtn.addEventListener("click", () => this.startGame());
  }

  // method to start the game
  async startGame() {

    // Clear previous messages
    const msg = document.getElementById("msg");
    msg.innerText = "";

    const n = Number(document.getElementById("numberInput").value);

    // Validate input
    if (Number.isNaN(n)) {
      msg.innerText = STRINGS.ERROR_NOT_NUMBER;
      return;
    }
    if (n < 3 || n > 7) {
      msg.innerText = STRINGS.ERROR_RANGE;
      return;
    }

    const width = "10em";
    const height = "5em";

    // reset game state
    this.expectedOrder = 1;
    this.buttons = [];

    // Create buttons (passes handleButtonClick as onClick)
    for (let i = 1; i <= n; i++) {
      const color = Button.randomRgb();
      const b = new Button(i, color, width, height, (btnObj) => this.handleButtonClick(btnObj));
      this.buttons.push(b);
    }

    // Mount buttons to UI (store container)
    this.container = UserInterface.mountButtons(this.buttons);

    // Not clickable until scrambling finishes
    UserInterface.disableButtons(this.container);

    // Pause n seconds
    await UserInterface.wait(n * 1000);

    // Scramble n times, 2 seconds apart
    for (let i = 0; i < n; i++) {
      UserInterface.scrambleUIButtons(this.container);
      await UserInterface.wait(2000);
    }

    // Hide numbers, enable clicking
    UserInterface.hideNumbers(this.container);
    UserInterface.enableButtons(this.container);

  }

  handleButtonClick(buttonObj) {

    // buttonObj is the Button instance that was clicked
    if (buttonObj.order === this.expectedOrder) {
      buttonObj.reveal();
      buttonObj.disable();
      this.expectedOrder++;

      if (this.expectedOrder > this.buttons.length) {
        this.ui.setMessage(STRINGS.MSG_EXCELLENT);
        this.endGame();
      }
    } else {
      this.ui.setMessage(STRINGS.MSG_WRONG);
      this.revealAll();
    }
  }

  revealAll() {
    for (const b of this.buttons) {
      b.reveal();
      b.disable();
    }
  }

  endGame() {
    // disable everything
    for (const b of this.buttons) b.disable();
  }

}
