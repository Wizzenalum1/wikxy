console.log("this is fist thing in theprofile ")
po3 = "nothing"
{   
    profileInput = $("input[type='file']")
    profileInput[0].addEventListener("change", handleFiles, false);
    function handleFiles() {
        const fileList = this.files; /* now you can work with the file list */
        console.log(fileList)
        const reader = new FileReader();
        reader.onload = (function(aImg) { 
        return function(e) { aImg.src = e.target.result; }; })($('img')[0]);
            reader.readAsDataURL(fileList[0]);
    }
}
