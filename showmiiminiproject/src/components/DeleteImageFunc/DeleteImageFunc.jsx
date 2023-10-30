import { showmiistorage } from "../../config/firebase";
import { ref, deleteObject } from "firebase/storage";

export default async function DeleteImageFromStorage(imagename){
    const delstorageref= ref(showmiistorage, 'imagesuploaded/'+imagename)
    let result 
    await deleteObject(delstorageref).then(()=>{
        result = "success"
    }).catch((error)=>{
        console.log("something is wrong when deleting from storage", error) 
        result = "failed"
    })
    return result
}