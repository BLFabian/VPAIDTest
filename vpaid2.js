(function () {
  function VPAIDAd() {
    console.log("VPAIDAd instance created");
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
    console.log("initAd called with params:", {
      width,
      height,
      viewMode,
      desiredBitrate,
      creativeData,
      environmentVars,
    });

    // Environment vars
    this.slot = environmentVars.slot;
    this.videoSlot = environmentVars.videoSlot;

    if (!this.slot) {
      console.error("Ad container (slot) is not provided");
      return;
    }

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

    console.log("Blue box created", blueBox);

    // Add the blue box to the container
    this.slot.appendChild(blueBox);
    console.log("Blue box appended to the slot");

    // Notify that the ad has loaded
    this.callEvent("AdLoaded");
    console.log("AdLoaded event called");
  };

  VPAIDAd.prototype.startAd = function () {
    console.log("startAd called");
    this.callEvent("AdStarted");
    console.log("AdStarted event called");
  };

  VPAIDAd.prototype.stopAd = function () {
    console.log("stopAd called");
    this.callEvent("AdStopped");
    console.log("AdStopped event called");
  };

  VPAIDAd.prototype.resizeAd = function (width, height, viewMode) {
    console.log("resizeAd called with params:", { width, height, viewMode });
  };

  VPAIDAd.prototype.pauseAd = function () {
    console.log("pauseAd called");
    this.callEvent("AdPaused");
    console.log("AdPaused event called");
  };

  VPAIDAd.prototype.resumeAd = function () {
    console.log("resumeAd called");
    this.callEvent("AdPlaying");
    console.log("AdPlaying event called");
  };

  VPAIDAd.prototype.expandAd = function () {
    console.log("expandAd called");
    this.callEvent("AdExpanded");
    console.log("AdExpanded event called");
  };

  VPAIDAd.prototype.collapseAd = function () {
    console.log("collapseAd called");
    this.callEvent("AdCollapsed");
    console.log("AdCollapsed event called");
  };

  VPAIDAd.prototype.subscribe = function (callback, eventName) {
    console.log("subscribe called for event:", eventName);
    this.eventsCallbacks[eventName] = callback;
  };

  VPAIDAd.prototype.unsubscribe = function (eventName) {
    console.log("unsubscribe called for event:", eventName);
    delete this.eventsCallbacks[eventName];
  };

  VPAIDAd.prototype.callEvent = function (eventType) {
    console.log("callEvent called for event:", eventType);
    if (this.eventsCallbacks[eventType]) {
      console.log("Executing callback for event:", eventType);
      this.eventsCallbacks[eventType]();
    }
  };

  window.getVPAIDAd = function () {
    console.log("getVPAIDAd called");
    return new VPAIDAd();
  };
})();
