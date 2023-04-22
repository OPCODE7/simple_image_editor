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
    <input type="range"  min="-20" max="20" step="1" id="straightening" value="0">
    <div class="editor__rotate__controls__image">
        <i class="fa-solid fa-arrow-rotate-right editor__arrow__button"></i>
        <i class="fa-solid fa-arrows-left-right editor__arrow__button"></i>
    </div>
    <i class="fa-solid fa-reply editor__arrow__button"></i>
`;

const $filterImage= d.createElement("div");
$filterImage.classList.add("editor__filters");

$filterImage.innerHTML+= `
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
    <div class="editor__filter__button" id="constrast" style="filter: constrast(100%);">
        Contrast
    </div>
    <div class="editor__filter__button" id="invert" style="filter: invert(90%);">
        Invert
    </div>
`;

const $brightnessImage= d.createElement("div");
$brightnessImage.classList.add("editor__brightness__image");

$brightnessImage.innerHTML+= `
    <p>Brillo de imagen</p>
    <input type="range"  min="0" max="200" step="1" id="brightness" value="20">
    <i class="fa-solid fa-reply editor__arrow__button"></i>
`;

let currentRotate = 0, widthEditorImage = $previewImage.parentElement.clientWidth, heightEditorImage = $previewImage.parentElement.clientHeight,whoFilterApply= {
    filter: "",
    unit:""
};



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
        $previewImage.style.scale= `1.4`;
    }

    if(e.target.matches("#filter-intensity")){
        $previewImage.style.filter= `${whoFilterApply.filter}(${e.target.value}${whoFilterApply.unit})`;
    }

    if(e.target.matches("#brightness")){
        $previewImage.style.filter= `brightness(${e.target.value}%)`;
    }
});

d.addEventListener("click", e => {

    if (e.target.matches(".editor__close__image")) {
        $previewImage.classList.add("d-none");
        $previewImage.parentElement.removeAttribute("style");
        $previewImage.src= "";
        $buttonGetFile.classList.remove("d-none");
        $buttonCloseImage.style.display = "none";
        $previewImage.removeAttribute("style");
        if($editorTools.children.length>0){
            $editorTools.childNodes.forEach(node => $editorTools.removeChild(node));
        }
    }

    if (e.target.matches("#close-modal")) {
        $modalErrorHandler.classList.add("d-none");
        d.body.classList.remove("opacity__filter");
    }

    if (e.target.matches(".fa-crop-simple")) {
        $editorTools.childNodes.forEach(el => $editorTools.removeChild(el));
        if($previewImage.getAttribute("src").length!==0){
            $editorTools.appendChild($resizeImage);
            $editorTools.querySelector("#straightening").value= "0";
        }else{
            $buttonGetFile.classList.add("active__select__image__animation");
            setTimeout(() => {
                $buttonGetFile.classList.remove("active__select__image__animation");
            }, 1000);
        }
    }

    if(e.target.matches(".fa-brush")){
        $editorTools.childNodes.forEach(el => $editorTools.removeChild(el));

        if($previewImage.getAttribute("src").length!==0){
            $editorTools.appendChild($filterImage);
            $editorTools.querySelector("#filter-intensity").value= "100";
            $editorTools.querySelector("#filter-intensity").disabled= true;
        }else{
            $buttonGetFile.classList.add("active__select__image__animation");
            setTimeout(() => {
                $buttonGetFile.classList.remove("active__select__image__animation");
            }, 1000);
        }
    }

    if(e.target.matches(".fa-circle-half-stroke")){
        $editorTools.childNodes.forEach(el => $editorTools.removeChild(el));
        if($previewImage.getAttribute("src").length!==0){
            $editorTools.appendChild($brightnessImage);
            $editorTools.querySelector("#brightness").value= "20";
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

    let $buttonFilters= $filterImage.querySelectorAll(".editor__filter__button");
    $buttonFilters.forEach(button => {
        button.style.backgroundImage= `url(${$previewImage.src})`;
        if(e.target===button){
            e.target.style.border= "2px solid #EB455F";
            $buttonFilters.forEach(button => {
                if(button.hasAttribute("style") && button!==e.target) button.style.border= "none";
            });

            d.querySelector("#filter-intensity").removeAttribute("disabled");
            $previewImage.style.filter= `${whoFilterApply.filter}(${$filterImage.querySelector("#filter-intensity").value}${whoFilterApply.unit})`;
            
        } 
    });

    if(e.target.matches("#gray-scale")){
        whoFilterApply.filter= "grayscale";
        whoFilterApply.unit= "%";
    }
    if(e.target.matches("#blur")){
        whoFilterApply.filter= "blur";
        whoFilterApply.unit= "px";
    }
    if(e.target.matches("#sepia")){
        whoFilterApply.filter= "sepia";
        whoFilterApply.unit= "%";
    }
    if(e.target.matches("#saturate")){
        whoFilterApply.filter= "saturate";
        whoFilterApply.unit= "%";
    }
    if(e.target.matches("#opacity")){
        whoFilterApply.filter= "opacity";
        whoFilterApply.unit= "%";
    }
    if(e.target.matches("#hue-rotate")){
        whoFilterApply.filter= "hue-rotate";
        whoFilterApply.unit= "deg";
    }
    if(e.target.matches("#contrast")){
        whoFilterApply.filter= "contrast";
        whoFilterApply.unit= "%";
    }
    if(e.target.matches("#invert")){
        whoFilterApply.filter= "invert";
        whoFilterApply.unit= "%";
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
        $previewImage.parentElement.style.backgroundColor= "transparent";
    }, false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

function validFile(file) {
    let allowedExtensions = /(.jpg|.jpeg|.png|.webp)$/i;
    return allowedExtensions.test(file) ? true : false;
}



