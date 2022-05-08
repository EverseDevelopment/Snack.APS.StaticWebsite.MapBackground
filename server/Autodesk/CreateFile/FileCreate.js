const rp = require('request-promise');
const fileConfig = require('./FileConfig')
const eachLimit = require('async.eachlimit')
const fs = require('fs')
const Forge = require ('forge-apis')

module.exports = {

    execute : async function (getToken, bucketKey, objectKey,
       tempPath,  opts = {})  {

     
    return await new Promise(async (resolve, reject)  => {

      //Chunk size by default 5mb, cannot be smaller than 2mb
      const chunkSize = opts.chunkSize || 5 * 1024 * 1024

      var objectsAPI = new Forge.ObjectsApi()

      //Get stats of file
      const statsObj = fs.statSync(tempPath);

      //Round number of chunks
      const nbChunks = Math.ceil(statsObj.size / chunkSize)
      
      //Generates an array with each chunk number
      const chunksMap = Array.from({
        length: nbChunks
      }, (e, i) => i)

      // generates uniques session ID
      var format='xxxxxxxxxxxx'
      var d = new Date().getTime();
      const sessionId = format.replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
      })

      const token = await new Forge.AuthClientTwoLegged('xuOxBGMyIELM9PgRJuD8aIoHU33laUVZ', 'aoQDAnNMvHfXwFSo', [
        'data:read',
        'data:write'
      ], true);

      var credentialsToken

      await token.authenticate().then(function(credentials){
        credentialsToken = credentials
      }, function(err){
      console.error(err);
      });

      // prepare the upload tasks
      const uploadTasks = chunksMap.map((chunkIdx) => {
        
        //define the start size point
        const start = chunkIdx * chunkSize
        
        //define the end size point
        const end = Math.min(
        statsObj.size, (chunkIdx + 1) * chunkSize) - 1

        //Define range
        const range = `bytes ${start}-${end}/${statsObj.size}`

        //Define the length
        const length = end - start + 1

        //Create stream with the file
        const readStream = fs.createReadStream(tempPath, {start, end})

        

        const run = async () => {
          return objectsAPI.uploadChunk(
            bucketKey, objectKey,
            length, range, sessionId,
            readStream, {},
          {autoRefresh: false}, credentialsToken)
      }

      return {
        chunkIndex: chunkIdx,
        run
      }
      })

      let progress = 0

      // runs asynchronously in parallel the upload tasks
      // number of simultaneous uploads is defined by
      // opts.concurrentUploads
      await eachLimit(uploadTasks, opts.concurrentUploads || 3,
      (task, callback) => {
        task.run().then((res) => {
          progress += 100.0 / nbChunks

          if (opts.onProgress) {

          opts.onProgress ({
          progress: Math.round(progress * 100) / 100,
          chunkIndex: task.chunkIndex
          })
          }
          console.log(progress)
          callback ()

        }, (err) => {
          if (opts.onError) {
          opts.onError(err)
          }
          console.log(err)
          callback(err)
        })

      }, (err) => {

      if (!err && opts.onComplete) {

      opts.onComplete ()
      }
      console.log("Option Create")
      resolve({
        fileSize: statsObj.size,
        bucketKey,
        objectKey,
        nbChunks
        })
      })

    })
    }
}
  