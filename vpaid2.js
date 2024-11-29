  (function () {
    var adCreative = {
      initAd: function (width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
        var adContainer = environmentVars.slot;
        var blueBox = document.createElement('div');
        blueBox.style.width = '100%';
        blueBox.style.height = '100%';
        blueBox.style.backgroundColor = 'blue';
        blueBox.style.display = 'flex';
        blueBox.style.alignItems = 'center';
        blueBox.style.justifyContent = 'center';
        blueBox.style.color = 'white';
        blueBox.style.fontSize = '48px';
        blueBox.innerText = 'HI';
        adContainer.appendChild(blueBox);
      },
      startAd: function () {
        console.log('Ad started');
      },
      stopAd: function () {
        console.log('Ad stopped');
      },
      skipAd: function () {
        console.log('Ad skipped');
      },
      resizeAd: function (width, height, viewMode) {
        console.log('Ad resized');
      },
      pauseAd: function () {
        console.log('Ad paused');
      },
      resumeAd: function () {
        console.log('Ad resumed');
      },
      expandAd: function () {
        console.log('Ad expanded');
      },
      collapseAd: function () {
        console.log('Ad collapsed');
      },
    };

    window.getVPAIDAd = function () {
      return adCreative;
    };
  })();
