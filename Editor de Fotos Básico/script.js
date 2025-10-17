const imageUpload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturation = document.getElementById("saturation");
const blur = document.getElementById("blur");
let img = null;
imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                preview.innerHTML = "";
                preview.appendChild(img);
                applyFilters();
            };
        };
        reader.readAsDataURL(file);
    }
});
function applyFilters() {
    if (img) {
        const brightnessValue = brightness.value / 100;
        const contrastValue = contrast.value / 100;
        const saturationValue = saturation.value / 100;
        const blurValue = blur.value + "px";
        img.style.filter = `brightness(${brightnessValue}) contrast(${contrastValue}) saturate(${saturationValue}) blur(${blurValue})`;
    }
}
function saveImage() {
    if (img) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = img.style.filter;
        ctx.drawImage(img, 0, 0);
        const link = document.createElement("a");
        link.download = "edited_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    } else {
        alert("Por favor, faça o upload de uma imagem primeiro!");
    }
}
brightness.addEventListener("input", applyFilters);
contrast.addEventListener("input", applyFilters);
saturation.addEventListener("input", applyFilters);
blur.addEventListener("input", applyFilters);