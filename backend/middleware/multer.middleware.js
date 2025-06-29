import multer from "multer";


const storage = multer.memoryStorage()
const filefilter = (req,file,cb)=>{
    const allowed = ['.csv','.xlsx','.xls']
    const ext = file.originalname.split('.').pop()
    if(!allowed.includes(`.${ext}`)){
     return cb(new Error('Only csv, xlsx, xls files are allowed'),false)
    }
  cb(null,true)
}

const upload = multer({
    storage,
    filefilter
})
export default upload