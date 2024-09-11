const uploadBox = document.querySelector(".upload-box"),
    previewImg = uploadBox.querySelector("img"),
    fileInput = uploadBox.querySelector("input"),
    widthInput = document.querySelector(".width input"),
    heightInput = document.querySelector(".height input"),
    ratioInput = document.querySelector(".ratio input"),
    qualityInput = document.querySelector(".quality input"),
    downloadBtn = document.querySelector(".download-btn"),
    darkModeBtn = document.querySelector(".dark-mode-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0]; // getting first user selected file
    if (!file) return; // return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => { // once img loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
};

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const quality = qualityInput.checked ? 0.7 : 1.0;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(previewImg, 0, 0, width, height);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", quality);
    link.download = "resized-image.jpg";
    link.click();
};

uploadBox.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", loadFile);
downloadBtn.addEventListener("click", resizeAndDownload);

// Dark mode toggle
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "Toggle Light Mode";
    } else {
        darkModeBtn.textContent = "Toggle Dark Mode";
    }
};

darkModeBtn.addEventListener("click", toggleDarkMode);

// Reset wrapper size when no image is present
fileInput.addEventListener("change", (e) => {
    if (!e.target.files[0]) {
        document.querySelector(".wrapper").classList.remove("active");
    }
});
