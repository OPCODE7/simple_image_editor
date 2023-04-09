const d = document;
const $previewImage = d.querySelector(".editor__picture");
const $buttonGetFile = d.querySelector(".editor__file");
const $buttonCloseImage = d.querySelector(".editor__close__image");
const $file = d.querySelector("#file");

d.addEventListener("change", e => {
    if (e.target.matches("#file")) {
        previewFile($previewImage, e.target.files[0]);
    }
});

d.addEventListener("click", e => {
    if (e.target.matches(".editor__close__image")) {
        $previewImage.classList.add("d-none");
        $buttonGetFile.classList.remove("d-none");
        $buttonCloseImage.style.display = "none";
    }
});

d.addEventListener("dragover", e => {
    e.preventDefault();
    if (e.target.matches(".editor__image")) {
        e.target.classList.add("drag__over");
        $buttonGetFile.classList.add("d-none");


    }
});

d.addEventListener("drop", e => {
    e.preventDefault();
    if (e.target.matches(".editor__image")) {
        if (e.dataTransfer.items) {
            for (var i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();
                    e.target.classList.remove("drag__over");
                    previewFile($previewImage,file);

                    
                }
            }
        } 
    }
});

function previewFile(preview, file) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        preview.src = reader.result;
        $buttonGetFile.classList.add("d-none");
        preview.classList.remove("d-none");
        $buttonCloseImage.style.display = "block";

    }, false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}