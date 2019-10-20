//converts card to a canvas img
let cardDiv = document.querySelector(".cardDiv");
cardDiv.style.letterSpacing = "0.1px";
document.querySelector("#captureBtn").addEventListener("click", () => {
  html2canvas(cardDiv, {
    useCORS: true,
    allowTaint: true
  }).then(canvas => {
    //img url
    let imgUrl = canvas.toDataURL("image/png");

    //get url id
    let id = window.location.pathname.split("/").slice(-1)[0];
    window.open(imgUrl, "_blank");

    //ajax send pic url
    $.ajax({
      type: "PUT",
      url: `/cards/${id}`,
      data: {
        imgUrl: imgUrl
      }
    });
  });
});
