const getToken = require('./Autodesk/Token/GetToken')
const removeFile = require('./Files/Remove')
const storageCreate = require('./Autodesk/CreateStorage/StorageCreate')
const fileCreate = require('./Autodesk/CreateFile/FileCreate')
const uploadFile = require('./Autodesk/UploadFile/UploadFile')
const BIM360Config = require('./Autodesk/Config/BIM360Config')

module.exports = {
    execute : async function (fileName, tempPath) {
        
            var token = await getToken.value()
            var bucketData = await storageCreate.execute(token, fileName)
            var tempdata = await bucketData.split("urn:adsk.objects:os.object:").pop()
            var bucket = await tempdata.split('/')[0]
            var tempURN = await tempdata.split('/')[1]
            await fileCreate.execute(token, bucket, tempURN, tempPath)
            await uploadFile.execute(token, fileName, bucketData, BIM360Config.folder)
            await removeFile(tempPath);
    }
                                
}
