import path from 'path';
import multer from 'multer';

import { v4 as uuidv4} from 'uuid';
import { fileURLToPath} from 'url';
import { dirname,join} from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../uploads/'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
      const fileExtension = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${fileExtension}`);
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true);
    }else{
        cb(new Error('Only image files are allowed'),false)
    }
}


const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5  //5mb file size 
    },
    fileFilter:fileFilter
})

export default upload;