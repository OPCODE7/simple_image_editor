
export function previewFile(preview, file,buttonGetFile,buttonCloseImage) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        preview.src = reader.result;
        buttonGetFile.classList.add("d-none");
        preview.classList.remove("d-none");
        buttonCloseImage.style.display = "block";
        preview.parentElement.style.backgroundColor = "transparent";
    }, false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

export function validFile(file) {
    let allowedExtensions = /(.jpg|.jpeg|.png|.webp)$/i;
    return allowedExtensions.test(file) ? true : false;
}