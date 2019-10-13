let cardDiv = document.querySelector(".cardDiv");
cardDiv.style.letterSpacing = "0.1px";
document.querySelector("#captureBtn").addEventListener("click", () => {
  html2canvas(cardDiv, {
    useCORS: true,
    allowTaint: true,
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
    x: window.pageXOffset,
    y: window.pageYOffset
  }).then(canvas => {
    // document.body.appendChild(canvas);
    window.open(canvas.toDataURL("image/png"), "_blank");
  });
});
