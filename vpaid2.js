(function () {
  function VPAIDAd() {
    this.slot = null;
    this.videoSlot = null;
    this.videoSlotCanAutoPlay = false;
    this.eventsCallbacks = {};
  }

  VPAIDAd.prototype.initAd = function (
    width,
    height,
    viewMode,
    desiredBitrate,
    creativeData,
    environmentVars
  ) {
    // Environment vars
    this.slot = environmentVars.slot;
    this.videoSlot = environmentVars.videoSlot;

    // Create the blue box
    var blueBox = document.createElement("div");
    blueBox.style.width = width + "px";
    blueBox.style.height = height + "px";
    blueBox.style.backgroundColor = "blue";
    blueBox.style.display = "flex";
    blueBox.style.alignItems = "center";
    blueBox.style.justifyContent = "center";
    blueBox.style.color = "white";
    blueBox.style.fontSize = "48px";
    blueBox.innerText = "HI";

    // Add the blue box to the container
    if (this.slot) {
      this.slot.appendChild(blueBox);
    }

    // Notify that the ad has loaded
    this.callEvent("AdLoaded");
  };

  VPAIDAd.prototype.startAd = function () {
    this.callEvent("AdStarted");
  };

  VPAIDAd.prototype.stopAd = function () {
    this.callEvent("AdStopped");
  };

  VPAIDAd.prototype.resizeAd = function (width, height, viewMode) {
    console.log("Ad resized to " + width + "x" + height);
  };

  VPAIDAd.prototype.pauseAd = function () {
    this.callEvent("AdPaused");
  };

  VPAIDAd.prototype.resumeAd = function () {
    this.callEvent("AdPlaying");
  };

  VPAIDAd.prototype.expandAd = function () {
    this.callEvent("AdExpanded");
  };

  VPAIDAd.prototype.collapseAd = function () {
    this.callEvent("AdCollapsed");
  };

  VPAIDAd.prototype.subscribe = function (callback, eventName) {
    this.eventsCallbacks[eventName] = callback;
  };

  VPAIDAd.prototype.unsubscribe = function (eventName) {
    delete this.eventsCallbacks[eventName];
  };

  VPAIDAd.prototype.callEvent = function (eventType) {
    if (this.eventsCallbacks[eventType]) {
      this.eventsCallbacks[eventType]();
    }
  };

  window.getVPAIDAd = function () {
    return new VPAIDAd();
  };
})();
