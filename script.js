// Constants
const UNIT_CONVERSION = {
  cm: 0.393701,
  mm: 0.0393701,
};

// Helper Functions

function isDisplayed(element) {
  return element.style.display === "block";
}
function toggleDisplay(element) {
  const isCurrentlyVisible = element.style.display === "block";

  if (isCurrentlyVisible) {
    // If element is currently visible, hide it with animation
    element.style.animation = "bounceOut 1s";
    setTimeout(() => {
      element.style.display = "none";
      element.style.animation = ""; // Reset animation after hiding
    }, 1000); // Wait for 1 second (animation duration)
  } else {
    // If element is currently hidden, show it with animation
    element.style.display = "block";
    element.style.animation = "bounceIn 1s";
    setTimeout(() => {
      element.style.animation = ""; // Reset animation after showing
    }, 1000); // Wait for 1 second (animation duration)
  }
}

function toggleDisplayHeading(element) {
  const isCurrentlyVisible = element.style.display === "inline-block";

  if (isCurrentlyVisible) {
    // If element is currently visible, hide it with animation
    element.style.animation = "bounceOut 1s";
    setTimeout(() => {
      element.style.display = "none";
      element.style.animation = ""; // Reset animation after hiding
    }, 1000); // Wait for 1 second (animation duration)
  } else {
    // If element is currently hidden, show it with animation
    element.style.display = "inline-block";
    element.style.animation = "bounceIn 1s";
    setTimeout(() => {
      element.style.animation = ""; // Reset animation after showing
    }, 1000); // Wait for 1 second (animation duration)
  }
}

function convertToInches(value, unit) {
  return value * (UNIT_CONVERSION[unit] || 1);
}

// Event Listeners
document.getElementById("boxForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const boxStyle = document.getElementById("boxStyle").value;
  const leftToRight = parseFloat(document.getElementById("leftToRight").value);
  const frontToBack = parseFloat(document.getElementById("frontToBack").value);
  const topToBottom = parseFloat(document.getElementById("topToBottom").value);
  const units = document.getElementById("units").value;
  const tuckFlap = parseFloat(document.getElementById("tuckFlap").value);
  const gluedArea = parseFloat(document.getElementById("gluedArea").value);
  const corrugated = document.getElementById("corrugated").value;

  const spine = 0.15748;
  const footlock = 0.15748;
  const sheetLength = 38;
  const sheetWidth = 28;

  const result = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const invalidation = document.getElementById("invalidation-tooltip");
  const invalidationText = document.getElementById("invalidation-tooltip-text");
  const tooltip = document.getElementById("tooltip");
  const tooltipText = document.getElementById("tooltip-text");

  let L_R = leftToRight;
  let F_B = frontToBack;
  let T_B = topToBottom;

  if (units !== "inches") {
    L_R = convertToInches(leftToRight, units);
    F_B = convertToInches(frontToBack, units);
    T_B = convertToInches(topToBottom, units);
  }

  let length, width, trayLength, trayWidth, sleeveLength, sleeveWidth;

  // Calculate box dimensions based on selected style
  if (
    boxStyle === "123Bottom" ||
    boxStyle === "tuckEndAutoBottom"
  ) {
    length = L_R * 2 + F_B * 2 + gluedArea;
    width = F_B * 0.75 + T_B + F_B + tuckFlap;
  } else if (
    boxStyle === "4CornerTrayTuckTop" ||
    boxStyle === "sixCornerCakeBox"
  ) {
    length = T_B * 2 + L_R;
    width = T_B * 3 + F_B * 2;
  } else if (boxStyle === "autoBottomTray") {
    length = L_R * 2 + F_B * 2 + gluedArea;
    width = F_B * 0.75 + T_B;
  } else if (boxStyle === "bowlSleeve") {
    length = F_B * 2 + T_B * 2 + gluedArea;
    width = L_R;
  } else if (boxStyle === "doubleLockedWallLid") {
    length = T_B * 4 + L_R;
    width = T_B * 4 + F_B * 2;
    if (corrugated === "Yes") {
      length += (spine + footlock) * 2;
      width += spine + footlock;
    }
  } else if (boxStyle === "doubleWallTray") {
    length = T_B * 4 + L_R;
    width = T_B * 4 + F_B;
    if (corrugated === "Yes") {
      length += (spine + footlock) * 2;
      width += (spine + footlock) * 2;
    }
  } else if (
    boxStyle === "doubleWallTuckFront" ||
    boxStyle === "doubleWallTuckTop" ||
    boxStyle === "rollEndTuckTop"
  ) {
    length = T_B * 4 + L_R;
    width = T_B * 3 + F_B * 2;
    if (corrugated === "Yes") {
      length += (spine + footlock) * 2;
    }
  } else if (boxStyle === "fivePanelHanger") {
    length = L_R * 2 + F_B * 2 + gluedArea;
    width = T_B + F_B * 3 + tuckFlap * 2;
  } else if (
    boxStyle === "fourCornerCakeBox" ||
    boxStyle === "selfLockCakeBox"
  ) {
    length = T_B * 2 + L_R;
    width = T_B * 2 + T_B / 2 + F_B * 2;
  } else if (boxStyle === "fourCornerTray") {
    length = T_B * 2 + L_R;
    width = T_B * 2 + F_B;
  } else if (boxStyle === "pillowBox") {
    length = L_R + T_B * 2;
    width = F_B * 2 + gluedArea;
  } else if (boxStyle === "punchInsert") {
    length = L_R + T_B * 2;
    width = F_B + T_B * 2;
  } else if (boxStyle === "reverseTuckEnd" || boxStyle === "straightTuckEnd") {
    length = L_R * 2 + F_B * 2 + gluedArea;
    width = T_B + F_B * 2 + tuckFlap * 2;
  } else if (boxStyle === "sealEnd") {
    length = L_R * 2 + F_B * 2 + gluedArea;
    width = T_B + F_B * 2;
  } else if (boxStyle === "sealEndAutoBottom") {
    length = L_R * 2 + F_B * 2 + gluedArea;
    width = T_B + F_B * 0.75 + F_B;
  } else if (boxStyle === "sealEndSleeve") {
    length = L_R * 2 + F_B * 2 + gluedArea;
    width = T_B + F_B;
  } else if (boxStyle === "shippingCarton") {
    length = L_R * 2 + F_B * 2 + gluedArea;
    width = T_B + F_B;
  } else if (boxStyle === "trayAndSleeve") {
    // Set length and width as 0 to avoid error validation
    length = 1;
    width = 1;

    // Temporary constants for single wall tray
    const tempLength = T_B * 2 + L_R;
    const tempWidth = T_B * 2 + F_B;
    trayLength = T_B * 4 + L_R;
    trayWidth = T_B * 4 + F_B;
    sleeveLength = L_R;
    sleeveWidth = T_B * 2 + F_B * 2 + gluedArea;
    if (corrugated === "Yes") {
      trayLength += (spine + footlock) * 2;
      trayWidth += (spine + footlock) * 2;
    }
  } else if (boxStyle === "twoPiece") {
    // Set length and width as 0 to avoid error validation
    length = 1;
    width = 1;

    // Temporary constants for single wall tray
    const tempLength = T_B * 2 + L_R;
    const tempWidth = T_B * 2 + F_B;
    trayLength = T_B * 4 + L_R;
    trayWidth = T_B * 4 + F_B;
    sleeveLength = T_B * 4 + L_R;
    sleeveWidth = T_B * 4 + F_B;
    if (corrugated === "Yes") {
      trayLength += (spine + footlock) * 2;
      trayWidth += (spine + footlock) * 2;
      sleeveLength += (spine + footlock) * 2;
      sleeveWidth += (spine + footlock) * 2;
    }
  }

  if (
    (leftToRight == 0 && frontToBack == 0 && topToBottom == 0) ||
    leftToRight == 0 ||
    frontToBack == 0 ||
    topToBottom == 0
  ) {
    invalidationText.innerHTML =
      '<p>Please enter a valid size!</p><button type="dismissBtn" id="dismissBtn" class="dismissBtn" title="Click to dismiss all messages">Dismiss All</button>';
    toggleDisplayHeading(invalidation);
    toggleDisplay(invalidationText);
    return;
  }

  if (boxStyle === "pillowBox") {
    if (corrugated === "Yes") {
      invalidationText.innerHTML =
        '<p><span class="focused-text">Pillow Boxes</span> can\'t be made from corrugated stock.</p><button type="dismissBtn" id="dismissBtn" class="dismissBtn" title="Click to dismiss all messages">Dismiss All</button>';
      toggleDisplayHeading(invalidation);
      toggleDisplay(invalidationText);
      return;
    }

    tooltipText.innerHTML =
      "<p>Please make sure to consult with a designer to verify if this size is correct.</p>";

    toggleDisplayHeading(tooltip);
    toggleDisplay(tooltipText);
  }

  if (!length || !width) {
    alert(
      "There was a problem with the calculator, please report to Nick via email if the issue persists."
    );
    window.location.reload();
    return;
  }

  if (isDisplayed(resultText)) {
    invalidationText.innerHTML =
      '<p>Please dismiss the previous <span class="focused-text">Open Size</span> before calculating a new size.</p><button type="dismissBtn" id="dismissBtn" class="dismissBtn" title="Click to dismiss all messages">Dismiss All</button>';
    toggleDisplayHeading(invalidation);
    toggleDisplay(invalidationText);
    return;
  }

  if (boxStyle === "trayAndSleeve") {
    resultText.innerHTML = `<p><span class="focused-text">Tray (DW):</span> ${trayLength.toFixed(2).endsWith(".00")
      ? trayLength.toFixed(0)
      : trayLength.toFixed(2)
      } x ${trayWidth.toFixed(2).endsWith(".00")
        ? trayWidth.toFixed(0)
        : trayWidth.toFixed(2)
      } inches</p>
      <p><span class="focused-text">Tray (SW):</span> ${tempLength.toFixed(2).endsWith(".00")
        ? tempLength.toFixed(0)
        : tempLength.toFixed(2)
      } x ${tempWidth.toFixed(2).endsWith(".00")
        ? tempWidth.toFixed(0)
        : tempWidth.toFixed(2)
      } inches</p>
      <p><span class="focused-text">Sleeve:</span> ${sleeveLength.toFixed(2).endsWith(".00")
        ? sleeveLength.toFixed(0)
        : sleeveLength.toFixed(2)
      } x ${sleeveWidth.toFixed(2).endsWith(".00")
        ? sleeveWidth.toFixed(0)
        : sleeveWidth.toFixed(2)
      } inches</p>
<span class="noteMsg"><strong>Note: </strong></span><span class="noteMsg">If the open size is greater than <strong>28 x 38 inches</strong> or <strong>38 x 28 inches</strong>, it's possibly an over-size, please make sure to verify the open size with a designer in such cases.</span><button type="dismissBtn" id="dismissBtn" class="dismissBtn" title="Click to dismiss all messages">Dismiss All</button>`;
  } else if (boxStyle === "twoPiece") {
    resultText.innerHTML = `<p><span class="focused-text">Lid (DW):</span> ${trayLength.toFixed(2).endsWith(".00")
      ? trayLength.toFixed(0)
      : trayLength.toFixed(2)
      } x ${trayWidth.toFixed(2).endsWith(".00")
        ? trayWidth.toFixed(0)
        : trayWidth.toFixed(2)
      } inches</p><p><span class="focused-text">Base (DW):</span> ${sleeveLength.toFixed(2).endsWith(".00")
        ? sleeveLength.toFixed(0)
        : sleeveLength.toFixed(2)
      } x ${sleeveWidth.toFixed(2).endsWith(".00")
        ? sleeveWidth.toFixed(0)
        : sleeveWidth.toFixed(2)
      } inches</p>
      <p><span class="focused-text">Lid (SW):</span> ${tempLength.toFixed(2).endsWith(".00")
        ? tempLength.toFixed(0)
        : tempLength.toFixed(2)
      } x ${tempWidth.toFixed(2).endsWith(".00")
        ? tempWidth.toFixed(0)
        : tempWidth.toFixed(2)
      } inches</p><p><span class="focused-text">Base (SW):</span> ${tempLength.toFixed(2).endsWith(".00")
        ? tempLength.toFixed(0)
        : tempLength.toFixed(2)
      } x ${tempWidth.toFixed(2).endsWith(".00")
        ? tempWidth.toFixed(0)
        : tempWidth.toFixed(2)
      } inches</p>
      <span class="noteMsg"><strong>Note: </strong></span><span class="noteMsg">If the open size is greater than <strong>28 x 38 inches</strong> or <strong>38 x 28 inches</strong>, it's possibly an over-size, please make sure to verify the open size with a designer in such cases.</span><button type="dismissBtn" id="dismissBtn" class="dismissBtn" title="Click to dismiss all messages">Dismiss All</button>`;
  } else {
    resultText.innerHTML = `<p>${length.toFixed(2).endsWith(".00") ? length.toFixed(0) : length.toFixed(2)
      } x ${width.toFixed(2).endsWith(".00") ? width.toFixed(0) : width.toFixed(2)
      } inches</p><span class="noteMsg"><strong>Note: </strong></span><span class="noteMsg">If the open size is greater than <strong>28 x 38 inches</strong> or <strong>38 x 28 inches</strong>, it's possibly an over-size, please make sure to verify the open size with a designer in such cases.</span><button type="dismissBtn" id="dismissBtn" class="dismissBtn" title="Click to dismiss all messages">Dismiss All</button>`;
  }

  toggleDisplayHeading(result);
  toggleDisplay(resultText);
});

document.querySelectorAll(".help-cursor").forEach(function (element) {
  element.addEventListener("click", function () {
    const tooltip = document.getElementById("tooltip");
    const tooltipText = document.getElementById("tooltip-text");

    tooltipText.innerHTML =
      '<p>Please leave the value for <span class="focused-text">Tuck Flap Size</span> and <span class="focused-text">Glued Area Size</span> as default if you don\'t know which value to use.</p><button type="dismissBtn" id="dismissBtn" class="dismissBtn" title="Click to dismiss all messages">Dismiss All</button>';

    toggleDisplayHeading(tooltip);
    toggleDisplay(tooltipText);
  });
});

// Event listener for dismissing elements
document.addEventListener("click", function (event) {
  const tooltip = document.getElementById("tooltip");
  const tooltipText = document.getElementById("tooltip-text");
  const result = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const invalidation = document.getElementById("invalidation-tooltip");
  const invalidationText = document.getElementById("invalidation-tooltip-text");

  if (event.target.matches("#dismissBtn")) {
    event.preventDefault();

    if (isDisplayed(invalidationText)) {
      toggleDisplay(invalidationText);
      toggleDisplayHeading(invalidation);
      /*       if (!isDisplayed(resultText)) {
        setTimeout(() => {
          document.getElementById("boxForm")?.reset();
        }, 1000);
      } */
    }

    if (isDisplayed(resultText)) {
      toggleDisplay(resultText);
      toggleDisplayHeading(result);
    }

    if (isDisplayed(tooltipText)) {
      toggleDisplay(tooltipText);
      toggleDisplayHeading(tooltip);
    }
  }
});

/* document.getElementById("boxForm").addEventListener("reset", function (event) {
  event.preventDefault();
  // Reload the page
  window.location.reload();
}); */
