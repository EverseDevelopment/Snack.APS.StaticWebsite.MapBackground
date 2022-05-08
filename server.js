const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const busboy = require('connect-busboy');
const path = require('path');
const fs = require('fs-extra')

const getModels = require('./server/getModels')
const uploadModel = require('./server/uploadModel')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));

//Make sure the upload folder is created
const uploadPath = path.join(__dirname, 'models/');
fs.ensureDir(uploadPath);

app.get('/token', (req, res) => {

    var options = {
        'method': 'POST',
        'url': 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PF=boZ6jpDwlNEmVzAGFiFx8i'
  },
    form: {
        'grant_type': 'client_credentials',
        'client_id': 'cgdKiPZg2eyg9xW8ZfRmMnfuAoGafQKT',
        'client_secret': '6LeJcOLE5SxjmMGg',
        'scope': 'data:read data:write'
  }
};
    request(options, function (error, response) {
        if (error) { throw new Error(error); }
        //send token info
        res.json(response.body);
    });    
  })


app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/pass', (req, res) => {
  console.log(req.body)
  if(req.body.user === "rewyre" && req.body.pass === "rewyre3d")
  {
      
    console.log(req.body)
    res.status(200);
    res.send({success: true});
  }
  else
  {
    console.log(req.body.user)
    res.status(400);
    res.send({success: false});
  }
})

app.get('/models',async (req, res) => {
  var models = await getModels.execute()
  res.status(200);
  res.send({models});
})


app.route('/upload/').post( async(req, res, next) => {
  req.pipe(req.busboy);
  let tempPath = '';
  await req.busboy.on('file', (fieldname, file, filename) => {
      console.log(`Upload of '${filename}' started`);

      tempPath = path.join(uploadPath, filename);
      file.pipe(fs.createWriteStream(tempPath))
      .on('error', function(err) {
        console.log("stream error==", err);
        if(fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
          console.log("====Junk file deleted===")
        }
      })
      .on('finish', async ()  => {
        console.log(`Upload of '${filename}' finished`);
        const body = {
          ModelURN: '',
          DisplayName : filename
        }
        await res.send(body);
        await res.status(201).end(); 
        fs.readFile(tempPath, async (err, data) => {
          if (err) {
            console.error(err)
            return
          }
           await uploadModel.execute(filename, tempPath)
        })
    });
  });

  const abort = () => {
    console.log("Busboy Error", tempPath);
    req.unpipe(busboy);
    if(fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
      console.log("=================Junk file deleted====================")
      res.set("Connection", "close");
    }
  }

  req.on("aborted", abort);
});



app.listen(port, () => console.log(`Listening on port ${port}`));