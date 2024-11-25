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
    // If element is currently visible, hide it
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

function toggleDisplayHeading(element) {
  const isCurrentlyVisible = element.style.display === "inline-block";

  if (isCurrentlyVisible) {
    // If element is currently visible, hide it
    element.style.display = "none";
  } else {
    // If element is currently hidden, show it
    element.style.display = "inline-block";
  }
}

function convertToInches(value, unit) {
  return value * (UNIT_CONVERSION[unit] || 1);
}

// Event Listeners
document.getElementById("boxForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Helper to get the box style's proper name
  const boxStyleSelect = document.getElementById("boxStyle");
  const boxStyleText =
    boxStyleSelect.options[boxStyleSelect.selectedIndex].text;

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

  const result = document.getElementById("result");
  const resultText = document.getElementById("result-text");

  let L_R = leftToRight;
  let F_B = frontToBack;
  let T_B = topToBottom;

  if (units !== "inches") {
    L_R = convertToInches(leftToRight, units);
    F_B = convertToInches(frontToBack, units);
    T_B = convertToInches(topToBottom, units);
  }

  let length,
    width,
    trayLength,
    trayWidth,
    sleeveLength,
    sleeveWidth,
    tempLength,
    tempWidth;

  // Calculate box dimensions based on selected style
  if (boxStyle === "123Bottom" || boxStyle === "tuckEndAutoBottom") {
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
    tempLength = T_B * 2 + L_R;
    tempWidth = T_B * 2 + F_B;
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
    tempLength = T_B * 2 + L_R;
    tempWidth = T_B * 2 + F_B;
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
    resultText.innerHTML = "<p>Please enter a valid size!</p>";
    /* toggleDisplayHeading(result); */
    toggleDisplay(resultText);
    return;
  }

  if (!length || !width) {
    alert(
      "There was a problem with the calculator, please report to Nick via email if the issue persists."
    );
    window.location.reload();
    return;
  }

  const dismissBtn = `<div id="dismissBtn" title="Click here to dismiss this open size">Dismiss</div>`;

  if (boxStyle === "trayAndSleeve") {
    resultText.innerHTML = `<p><span class="focused-text">Tray (DW):</span> ${
      trayLength.toFixed(2).endsWith(".00")
        ? trayLength.toFixed(0)
        : trayLength.toFixed(2)
    } x ${
      trayWidth.toFixed(2).endsWith(".00")
        ? trayWidth.toFixed(0)
        : trayWidth.toFixed(2)
    } inches</p>
      <p><span class="focused-text">Tray (SW):</span> ${
        tempLength.toFixed(2).endsWith(".00")
          ? tempLength.toFixed(0)
          : tempLength.toFixed(2)
      } x ${
      tempWidth.toFixed(2).endsWith(".00")
        ? tempWidth.toFixed(0)
        : tempWidth.toFixed(2)
    } inches</p>
      <p><span class="focused-text">Sleeve:</span> ${
        sleeveLength.toFixed(2).endsWith(".00")
          ? sleeveLength.toFixed(0)
          : sleeveLength.toFixed(2)
      } x ${
      sleeveWidth.toFixed(2).endsWith(".00")
        ? sleeveWidth.toFixed(0)
        : sleeveWidth.toFixed(2)
    } inches</p> ${dismissBtn}`;
  } else if (boxStyle === "twoPiece") {
    resultText.innerHTML = `<p><span class="focused-text">Lid (DW):</span> ${
      trayLength.toFixed(2).endsWith(".00")
        ? trayLength.toFixed(0)
        : trayLength.toFixed(2)
    } x ${
      trayWidth.toFixed(2).endsWith(".00")
        ? trayWidth.toFixed(0)
        : trayWidth.toFixed(2)
    } inches</p><p><span class="focused-text">Base (DW):</span> ${
      sleeveLength.toFixed(2).endsWith(".00")
        ? sleeveLength.toFixed(0)
        : sleeveLength.toFixed(2)
    } x ${
      sleeveWidth.toFixed(2).endsWith(".00")
        ? sleeveWidth.toFixed(0)
        : sleeveWidth.toFixed(2)
    } inches</p> <br/>
      <p><span class="focused-text">Lid (SW):</span> ${
        tempLength.toFixed(2).endsWith(".00")
          ? tempLength.toFixed(0)
          : tempLength.toFixed(2)
      } x ${
      tempWidth.toFixed(2).endsWith(".00")
        ? tempWidth.toFixed(0)
        : tempWidth.toFixed(2)
    } inches</p><p><span class="focused-text">Base (SW):</span> ${
      tempLength.toFixed(2).endsWith(".00")
        ? tempLength.toFixed(0)
        : tempLength.toFixed(2)
    } x ${
      tempWidth.toFixed(2).endsWith(".00")
        ? tempWidth.toFixed(0)
        : tempWidth.toFixed(2)
    } inches</p>  ${dismissBtn}`;
  } else {
    resultText.innerHTML = `<p>${
      length.toFixed(2).endsWith(".00") ? length.toFixed(0) : length.toFixed(2)
    } x ${
      width.toFixed(2).endsWith(".00") ? width.toFixed(0) : width.toFixed(2)
    } inches</p>  ${dismissBtn}`;
  }

  toggleDisplayHeading(result);
  toggleDisplay(resultText);

  // Result message
  const resultMessage = `**Box Style**: ${boxStyleText}\n**Finish Size:** ${leftToRight}x${frontToBack}x${topToBottom} ${units}\n**Tuck Flap**: ${tuckFlap} inches\n**Glued Area**: ${gluedArea} inches\n**Corrugated**: ${corrugated}\n\n**Open Size:** ${
    boxStyleText === "Tray and Sleeve" || boxStyleText === "Two Piece"
      ? "\n"
      : ""
  } ${document
    .getElementById("result-text")
    .textContent.replace(/Dismiss/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/inches/g, "inches\n")
    .trim()}`;

  // Discord webhook URL (replace with your actual webhook URL)
  const webhookUrl =
    "https://discord.com/api/webhooks/1309022400087719977/NQkz3LB75uIl6mbo3XvIDETomRkpWxGLhsxiuMTzT23IkjHu6sIr678Zn8MbrVTFCzTf";

  // The data payload for the webhook
  const payload = {
    content: resultMessage, // You can also use embeds if preferred
  };

  // Send the POST request to the Discord webhook
  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("Error:", error);
  });
});

// Event listener for dismissing elements
document.addEventListener("click", function (event) {
  const result = document.getElementById("result");
  const resultText = document.getElementById("result-text");

  if (event.target.matches("#dismissBtn")) {
    event.preventDefault();

    if (isDisplayed(resultText)) {
      toggleDisplay(resultText);
      toggleDisplayHeading(result);
    }
  }
});

// Reset button refreshes the tab
document.getElementById("boxForm").addEventListener("reset", function (event) {
  event.preventDefault();
  // Reload the page
  window.location.reload();
});

// Add the paste event listener for the input fields
document.getElementById("leftToRight").addEventListener("paste", handlePaste);
document.getElementById("frontToBack").addEventListener("paste", handlePaste);
document.getElementById("topToBottom").addEventListener("paste", handlePaste);
document.getElementById("units").addEventListener("paste", handlePaste);

// Function to handle paste
function handlePaste(event) {
  const pastedData = event.clipboardData.getData("text");

  // Updated regex to match decimals
  const validFormat =
    /^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*[a-zA-Z]+$|^\d+(\.\d+)?x\d+(\.\d+)?x\d+(\.\d+)?\s*[a-zA-Z]+$/;

  if (validFormat.test(pastedData)) {
    event.preventDefault();

    // Regex to extract the numbers and unit
    const match = pastedData.match(
      /([\d.]+)\s*x\s*([\d.]+)\s*x\s*([\d.]+)\s*([a-zA-Z]+)/
    );

    if (match) {
      let [, leftToRight, frontToBack, topToBottom, unit] = match;

      if (unit.toLowerCase() === "in") {
        unit = "inches";
      }

      // Populate the respective input fields
      document.getElementById("leftToRight").value = leftToRight;
      document.getElementById("frontToBack").value = frontToBack;
      document.getElementById("topToBottom").value = topToBottom;
      document.getElementById("units").value = unit;
    }
  } else {
    event.preventDefault();
  }
}
