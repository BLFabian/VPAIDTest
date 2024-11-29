(function () {
  const Pr = Symbol("button");
  const sr = Symbol("videoSlot");
  const or = Symbol("slot");

  class VPAIDAd {
    constructor() {
      this[or] = null; // Main slot (container)
      this[sr] = null; // Video slot
      this[Pr] = null; // Button element
    }

    handshakeVersion() {
      return "2.0";
    }

    initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
      const { videoSlot, slot } = environmentVars || {};

      this[or] = slot || document.createElement("div");
      this[sr] = videoSlot || document.createElement("video");

      if (!slot) {
        document.body.appendChild(this[or]);
      }

      this._styleElement(this[or], {
        position: "absolute",
        top: "0",
        left: "0",
        width: `${width}px`,
        height: `${height}px`,
      });

      this._styleElement(this[sr], {
        width: "100%",
        height: "100%",
        backgroundColor: "black", // Ensure video area is visible
      });

      this[or].appendChild(this[sr]);
      console.log("Ad initialized");
    }

    startAd() {
      console.log("hey"); // Logs "hey" when the ad starts
      this._addBlueButtonToVideo();
      this[sr]
        .play()
        .then(() => console.log("Ad started"))
        .catch((err) => console.error("Error starting ad:", err));
    }

    stopAd() {
      if (this[Pr]) {
        this[Pr].remove();
      }
      this[sr].pause();
      console.log("Ad stopped");
    }

    setAdVolume(value) {
      if (this[sr]) {
        this[sr].volume = value;
      }
    }

    getAdVolume() {
      return this[sr] ? this[sr].volume : 1;
    }

    // Utility to style elements
    _styleElement(element, styles) {
      Object.assign(element.style, styles);
    }

    // Create the Blue Button
    _createBlueButton() {
      const button = document.createElement("button");
      button.textContent = "Click Me!";
      this._styleElement(button, {
        position: "absolute",
        backgroundColor: "blue",
        color: "white",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize: "16px",
        zIndex: "1000",
      });
      button.addEventListener("click", () => {
        console.log("Blue Button Clicked!");
      });
      this[Pr] = button;
    }

    // Add the Blue Button to the center of the video
    _addBlueButtonToVideo() {
      this._createBlueButton();

      const button = this[Pr];
      const videoSlot = this[sr];
      if (!videoSlot) return;

      videoSlot.parentNode.appendChild(button);

      const adjustButtonPosition = () => {
        const rect = videoSlot.getBoundingClientRect();
        button.style.left = `${rect.left + window.scrollX + rect.width / 2 - button.offsetWidth / 2}px`;
        button.style.top = `${rect.top + window.scrollY + rect.height / 2 - button.offsetHeight / 2}px`;
      };

      // Recalculate button position when window resizes or scrolls
      window.addEventListener("resize", adjustButtonPosition);
      window.addEventListener("scroll", adjustButtonPosition);
      adjustButtonPosition();
    }
  }

  const vpaidAd = new VPAIDAd();
  window.getVPAIDAd = () => vpaidAd;
})();
