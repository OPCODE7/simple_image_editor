import * as components from "./js/components.js";

import { previewFile, validFile } from "./js/load_image.js";
const d = document;

let currentRotate = 0, widthEditorImage = components.$previewImage.parentElement.clientWidth, heightEditorImage = components.$previewImage.parentElement.clientHeight, isFlipped = false, brightness = false, straightening = false;

const filters = {
    "#gray-scale": { filter: "grayscale", unit: "%" },
    "#blur": { filter: "blur", unit: "px" },
    "#sepia": { filter: "sepia", unit: "%" },
    "#saturate": { filter: "saturate", unit: "%" },
    "#opacity": { filter: "opacity", unit: "%" },
    "#hue-rotate": { filter: "hue-rotate", unit: "deg" },
    "#contrast": { filter: "contrast", unit: "%" },
    "#invert": { filter: "invert", unit: "%" }
}

const whoFilterApply = {
    filter: "",
    unit: ""
}

function resetChanges() {
    if (components.$previewImage.classList.contains("flip__horizontal__image")) components.$previewImage.classList.remove("flip__horizontal__image");
    components.$previewImage.removeAttribute("style");
    brightness = false;
    isFlipped = false;
    straightening = false;
    currentRotate = 0;
    components.$saveImageButton.classList.add("inactive__save_image__button");
}

function noLoadImageAnimation() {
    components.$buttonGetFile.classList.add("active__select__image__animation");
    setTimeout(() => {
        components.$buttonGetFile.classList.remove("active__select__image__animation");
    }, 1000);
}


d.addEventListener("DOMContentLoaded", e => {
    components.$modalErrorHandler.classList.add("modal__error");

    components.$modalErrorHandler.classList.add("d-none");
    components.$modalErrorHandler.innerHTML = `
        <i class="fas fa-close editor__close__image" id="close-modal"></i>
        <i class="fa-solid fa-face-frown"></i>
        <p class="modal__error_text">Formato de archivo no permitido</p>
    `;

    d.body.appendChild(components.$modalErrorHandler);

    components.$rotateImage.classList.add("editor__resize__image");
    components.$rotateImage.innerHTML = `
    <input type="range"  min="-20" max="20" step="1" id="straightening" value="0">
    <div class="editor__rotate__controls__image">
        <i class="fa-solid fa-arrow-rotate-right editor__arrow__button"></i>
        <i class="fa-solid fa-arrows-left-right editor__arrow__button"></i>
    </div>
    <i class="fa-solid fa-reply editor__arrow__button"></i>
`;

    components.$filterImage.classList.add("editor__filters");
    components.$filterImage.innerHTML += `
    <div>
        <p class="editor__filters__selectintensity">Intensidad del filtro</p>
        <input type="range"  min="0" max="200" step="1" id="filter-intensity" value="100" disabled>
    </div>
    <i class="fa-solid fa-reply editor__arrow__button"></i>
    <div class="editor__filter__button" id="gray-scale" style="filter: grayscale(100%);">
        GrayScale
    </div>
    <div class="editor__filter__button" id="blur" style="filter: blur(100%);">
        Blur
    </div>
    <div class="editor__filter__button" id="sepia" style="filter: sepia(100%);">
        Sepia
    </div>
    <div class="editor__filter__button" id="saturate" style="filter: saturate(100%);">
        Saturate
    </div>
    <div class="editor__filter__button" id="opacity" style="filter: opacity(80%);">
        Opacity
    </div>
    <div class="editor__filter__button" id="hue-rotate" style="filter: hue-rotate(100deg);">
        Hue
    </div>
    <div class="editor__filter__button" id="contrast" style="filter: constrast(100%);">
        Contrast
    </div>
    <div class="editor__filter__button" id="invert" style="filter: invert(90%);">
        Invert
    </div>
`;

    components.$brightnessImage.classList.add("editor__brightness__image");
    components.$brightnessImage.innerHTML += `
    <p>Brillo de imagen</p>
    <input type="range"  min="0" max="200" step="1" id="brightness" value="20">
    <i class="fa-solid fa-reply editor__arrow__button"></i>
`;

});



d.addEventListener("change", e => {
    if (e.target.matches("#file")) {
        if (validFile(e.target.files[0].name)) {
            previewFile(components.$previewImage, e.target.files[0], components.$buttonGetFile, components.$buttonCloseImage);
        } else {
            d.body.classList.add("opacity__filter");
            components.$modalErrorHandler.classList.remove("d-none");
        }
    }
});

d.addEventListener("input", e => {

    if (e.target.matches('input[type="range"]')) components.$saveImageButton.classList.remove("inactive__save_image__button");

    if (e.target.matches("#straightening")) {
        components.$previewImage.style.rotate = `${e.target.value}deg`;
        components.$previewImage.style.scale = `1.4`;
        straightening = true;
    }

    if (e.target.matches("#filter-intensity")) {
        components.$previewImage.style.filter = `${whoFilterApply.filter}(${e.target.value}${whoFilterApply.unit})`;
    }

    if (e.target.matches("#brightness")) {
        brightness = true;
        components.$previewImage.style.filter = `brightness(${e.target.value}%)`;
    }
});

d.addEventListener("click", e => {

    if (e.target.matches(".editor__close__image")) {
        resetChanges();
        e.target.parentElement.removeAttribute("style");
        components.$previewImage.classList.add("d-none");
        components.$previewImage.src = "";
        components.$buttonGetFile.classList.remove("d-none");
        components.$buttonCloseImage.classList.add("d-none");
        components.$previewImage.removeAttribute("style");
        if (components.$editorTools.children.length > 0) components.$editorTools.innerHTML = "";

    }

    if (e.target.matches("#close-modal")) {
        components.$modalErrorHandler.classList.add("d-none");
        d.body.classList.remove("opacity__filter");
    }

    if (e.target.matches(".fa-crop-simple")) {
        components.$editorTools.innerHTML = "";
        if (components.$previewImage.getAttribute("src").length !== 0) {
            components.$editorTools.appendChild(components.$rotateImage);
            components.$editorTools.querySelector("#straightening").value = "0";
        } else {
            noLoadImageAnimation();
        }
    }

    if (e.target.matches(".fa-brush")) {
        components.$editorTools.innerHTML = "";

        if (components.$previewImage.getAttribute("src").length !== 0) {
            components.$editorTools.appendChild(components.$filterImage);
            components.$editorTools.querySelector("#filter-intensity").value = "100";
            components.$editorTools.querySelector("#filter-intensity").disabled = true;
        } else {
            noLoadImageAnimation();
        }
    }

    if (e.target.matches(".fa-circle-half-stroke")) {
        components.$editorTools.innerHTML = "";
        if (components.$previewImage.getAttribute("src").length !== 0) {
            components.$editorTools.appendChild(components.$brightnessImage);
            components.$editorTools.querySelector("#brightness").value = "20";
        } else {
            noLoadImageAnimation();
        }

    }


    if (e.target.matches(".fa-arrow-rotate-right")) {
        components.$saveImageButton.classList.remove("inactive__save_image__button");
        currentRotate += 90;
        components.$previewImage.style.rotate = `${currentRotate}deg`;
        components.$previewImage.style.flexShrink = "0";
        if (currentRotate === 90 || currentRotate === 270) {
            components.$previewImage.style.width = `${heightEditorImage}px`;
            components.$previewImage.style.height = `${widthEditorImage}px`;
        } else {
            components.$previewImage.style.width = `100%`;
            components.$previewImage.style.height = `100%`;
        }

        if (currentRotate > 270) currentRotate = 0;
    }

    if (e.target.matches(".fa-arrows-left-right")) {
        components.$saveImageButton.classList.remove("inactive__save_image__button");
        components.$previewImage.classList.toggle("flip__horizontal__image");
        isFlipped = true;
    }

    if (e.target.matches(".fa-reply")) {
        resetChanges();
    }

    for (const [key, value] of Object.entries(filters)) {
        if (e.target.matches(key)) {
            whoFilterApply.filter = value.filter;
            whoFilterApply.unit = value.unit;
        }
    }

    let $buttonFilters = components.$filterImage.querySelectorAll(".editor__filter__button");

    $buttonFilters.forEach(button => {
        button.style.backgroundImage = `url(${components.$previewImage.src})`;
        if (e.target === button) {
            e.target.style.border = "2px solid #EB455F";

            $buttonFilters.forEach(button => {
                if (button.hasAttribute("style") && button !== e.target) button.style.border = "none";
            });

            const $filterIntensity = components.$filterImage.querySelector("#filter-intensity");
            $filterIntensity.removeAttribute("disabled");

            components.$previewImage.style.filter = `${whoFilterApply.filter}(${$filterIntensity.value}${whoFilterApply.unit})`;
        }
    });


    if (e.target.matches(".fa-floppy-disk")) {
        if (components.$previewImage.src !== "" && currentRotate !== 0 || isFlipped || brightness || straightening || whoFilterApply.filter !== "") {
            const ctx = components.$canvas.getContext("2d");
            components.$canvas.width = components.$previewImage.naturalWidth;
            components.$canvas.height = components.$previewImage.naturalHeight;

            ctx.translate(components.$canvas.width / 2, components.$canvas.height / 2);
            if (currentRotate !== 0) ctx.rotate(currentRotate * Math.PI / 180);
            if (isFlipped) ctx.scale(-1, 1);
            if (brightness) ctx.filter = `brightness(${d.querySelector("#brightness").value}%)`;
            if (straightening) ctx.rotate(d.querySelector("#straightening").value * Math.PI / 180);
            ctx.filter = `${whoFilterApply.filter}(${components.$filterImage.querySelector("#filter-intensity").value}${whoFilterApply.unit})`;

            ctx.drawImage(components.$previewImage, -components.$canvas.width / 2, - components.$canvas.height / 2, components.$canvas.width, components.$canvas.height);

            components.$link.download = "image.jpg";
            components.$link.href = components.$canvas.toDataURL();
            components.$link.click();
        }
    }
});

d.addEventListener("dragover", e => {
    e.preventDefault();
    if (e.target.matches(".editor__image")) {
        e.target.classList.add("drag__over");
        components.$buttonGetFile.classList.add("d-none");
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
                        previewFile(components.$previewImage, file, components.$buttonGetFile, components.$buttonCloseImage);
                    } else {
                        d.body.classList.add("opacity__filter");
                        components.$modalErrorHandler.classList.remove("d-none");
                        e.target.classList.remove("drag__over");
                    }

                }
            }
        }
    }
});
