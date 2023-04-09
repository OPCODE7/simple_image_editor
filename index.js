const d = document;
const $previewImage= d.querySelector(".editor__picture");
const $buttonGetFile= d.querySelector(".editor__file");
const $buttonCloseImage= d.querySelector(".editor__close__image"); 


d.addEventListener("change", e => {
    if (e.target.matches("#file")) {
        previewFile($previewImage,e.target);
    }
});

d.addEventListener("click", e => {
    if(e.target.matches(".editor__close__image")){
        $previewImage.classList.add("d-none");
        $buttonGetFile.classList.remove("d-none");
        $buttonCloseImage.style.display="none";
    }
});

function previewFile(preview,input) {
    const file= input.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        preview.src = reader.result;
        $buttonGetFile.classList.add("d-none");
        preview.classList.remove("d-none");
        $buttonCloseImage.style.display="block";
        
    },false
    );
    
    if (file) {
        reader.readAsDataURL(file);
    }
}