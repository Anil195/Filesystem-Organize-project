let fs = require("fs");
let path = require("path");

// taking folder path
let folderpath = process.argv[2];

let folderexsist = fs.existsSync(folderpath);
// object
let extensions = {
    python:['.py'],
    Music:[".mp3"],
    Documents:['.docx','.pptx','.doc','.pdf','.xlsx','.xls','.odt','.ods','.odp','.odg','.odf','.txt','.ps','.tex'],
    Archives:['.zip','.7z','.rar','.tar','.gz','.ar','.ios','.xz'],
    Video:['.mp4','.mkv'],
    App:['.exe','.dmg','.pkg','.deb',".apk"],
    Image:['.jpg',".png",".gif"],
    java:['.java'],
    javascript:['.js'],
    Html:['.html']

};

// reading fill extansion
if(folderexsist){
    console.log("Path is Valid!!!!!!");
    let files = fs.readdirSync(folderpath);
    // console.log(files);
    for(let i=0; i<files.length; i++){
        let ext = path.extname(files[i])
        let NameOfFolder=givFoldername(ext);
        // console.log("Ext--",ext,"Folder--",NameOfFolder);
        let pathOfFolder = path.join(folderpath,NameOfFolder)
        let exist = fs.existsSync(pathOfFolder)
        if(exist){
            moveFile(folderpath,pathOfFolder,files[i]);
        }else{
            fs.mkdirSync(pathOfFolder);
            moveFile(folderpath,pathOfFolder,files[i]);
        }
    }

}else{
    console.log("Pathe is Invalid !!!!!");
}
// file delong to which folder camparing file extanstion
function givFoldername(ext){
    for(let key in extensions ){
        let extArr = extensions[key];
        for(let i=0; i<extArr.length; i++){
            if(extArr[i]==ext){
                return key;
            }
        }
    }
    return "other";
}
function moveFile(folderpath,pathOfFolder,fileName){
    let sourcePath = path.join(folderpath,fileName);
    let destnationPath = path.join(pathOfFolder,fileName);
    fs.copyFileSync(sourcePath,destnationPath);
    fs.unlinkSync(sourcePath);
}