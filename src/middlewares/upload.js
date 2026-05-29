import multer from "multer"
import fs from "fs"


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = 'uploads/resume/'
    if (!fs.existsSync(folder)){
        fs.mkdirSync(folder,{recursive:true})
    }
    cb(null, folder )
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({storage:storage})