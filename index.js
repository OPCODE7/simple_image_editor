const d = document;
const $previewImage = d.querySelector(".editor__picture");
const $buttonGetFile = d.querySelector(".editor__file");
const $buttonCloseImage = d.querySelector(".editor__close__image");
const $file = d.querySelector("#file");

const $modalErrorHandler = d.createElement("div");
$modalErrorHandler.classList.add("modal__error");
$modalErrorHandler.classList.add("d-none");
$modalErrorHandler.innerHTML= `
    <i class="fas fa-close editor__close__image" id="close-modal"></i>
    <i class="fa-solid fa-face-frown"></i>
    <p class="modal__error_text">Formato de archivo no permitido</p>

`;

d.body.appendChild($modalErrorHandler);

d.addEventListener("change", e => {
    if (e.target.matches("#file")) {
        if (validFile(e.target.files[0].name)) {
            previewFile($previewImage, e.target.files[0]);
        }else{
            d.body.classList.add("opacity__filter");
            $modalErrorHandler.classList.remove("d-none");
        }
    }
});

d.addEventListener("click", e => {
    if (e.target.matches(".editor__close__image")) {
        $previewImage.classList.add("d-none");
        $buttonGetFile.classList.remove("d-none");
        $buttonCloseImage.style.display = "none";
    }

    if(e.target.matches("#close-modal")){
        $modalErrorHandler.classList.add("d-none");
        d.body.classList.remove("opacity__filter");
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
                    if (validFile(file.name)) {
                        e.target.classList.remove("drag__over");
                        previewFile($previewImage, file);
                    } else {
                        d.body.classList.add("opacity__filter");
                        $modalErrorHandler.classList.remove("d-none");
                        e.target.classList.remove("drag__over");
                    }

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

function validFile(file) {
    let allowedExtensions = /(.jpg|.jpeg|.png)$/i;
    return allowedExtensions.test(file) ? true : false;
}