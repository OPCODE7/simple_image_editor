const d = document;
const $previewImage = d.querySelector(".editor__picture");
const $buttonGetFile = d.querySelector(".editor__file");
const $buttonCloseImage = d.querySelector(".editor__close__image");
const $file = d.querySelector("#file");
const $editorTools = d.querySelector(".editor__tools");

const $modalErrorHandler = d.createElement("div");
$modalErrorHandler.classList.add("modal__error");
$modalErrorHandler.classList.add("d-none");
$modalErrorHandler.innerHTML = `
    <i class="fas fa-close editor__close__image" id="close-modal"></i>
    <i class="fa-solid fa-face-frown"></i>
    <p class="modal__error_text">Formato de archivo no permitido</p>
`;


const $resizeImage = d.createElement("div");
$resizeImage.classList.add("editor__resize__image");
$resizeImage.innerHTML = `
    <input type="range" class="" min="-20" max="20" step="1" id="straightening" value="0">
    <div class="editor__rotate__controls__image">
        <i class="fa-solid fa-arrow-rotate-right editor__arrow__button"></i>
        <i class="fa-solid fa-arrows-left-right editor__arrow__button"></i>
    </div>
    <i class="fa-solid fa-reply editor__arrow__button"></i>
`;

let currentRotate = 0, widthEditorImage = $previewImage.parentElement.clientWidth, heightEditorImage = $previewImage.parentElement.clientHeight;


d.body.appendChild($modalErrorHandler);

d.addEventListener("change", e => {
    if (e.target.matches("#file")) {
        if (validFile(e.target.files[0].name)) {
            previewFile($previewImage, e.target.files[0]);
        } else {
            d.body.classList.add("opacity__filter");
            $modalErrorHandler.classList.remove("d-none");
        }
    }
});

d.addEventListener("input",e => {
    if(e.target.matches("#straightening")){
        $previewImage.style.rotate= `${e.target.value}deg`;
        $previewImage.style.scale= `1.1`;
    }
});

d.addEventListener("click", e => {
    if (e.target.matches(".editor__close__image")) {
        $previewImage.classList.add("d-none");
        $buttonGetFile.classList.remove("d-none");
        $buttonCloseImage.style.display = "none";
    }

    if (e.target.matches("#close-modal")) {
        $modalErrorHandler.classList.add("d-none");
        d.body.classList.remove("opacity__filter");
    }

    if (e.target.matches(".fa-crop-simple")) {
        if($previewImage.getAttribute("src").length!==0){
            $editorTools.appendChild($resizeImage);
        }else{
            $buttonGetFile.classList.add("active__select__image__animation");
            setTimeout(() => {
                $buttonGetFile.classList.remove("active__select__image__animation");
            }, 1000);
        }
    }


    if (e.target.matches(".fa-arrow-rotate-right")) {
        currentRotate += 90;
        $previewImage.style.rotate = `${currentRotate}deg`;
        $previewImage.style.flexShrink = "0";
        if (currentRotate === 90 || currentRotate === 270) {

            $previewImage.style.width = `${heightEditorImage}px`;
            $previewImage.style.height = `${widthEditorImage}px`;
        } else {
            $previewImage.style.width = `100%`;
            $previewImage.style.height = `100%`;
        }

        if (currentRotate > 270) currentRotate = 0;
    }

    if (e.target.matches(".fa-arrows-left-right")) {
        $previewImage.classList.toggle("flip__horizontal__image");
    }

    if (e.target.matches(".fa-reply")) {
        if ($previewImage.classList.contains("flip__horizontal__image")) $previewImage.classList.remove("flip__horizontal__image");
        $previewImage.removeAttribute("style");

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



