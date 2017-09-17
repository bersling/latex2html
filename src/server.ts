import * as request from 'request';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as child_process from 'child_process';
import * as fs from 'fs';

const server = express();

// parse application/json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.post('/api/latex2html', function (req, res) {
  const payload = req.body;
  const fileId = Math.random().toString(36).substring(7);;
  const filePath = './conversions/' + fileId + '.tex';

  fs.writeFile(filePath, payload.latex, (writeFileError) => {

    if (writeFileError) {
      res.status(500).send(writeFileError.message);
    } else {
      const process = child_process.spawn('pandoc', [filePath, '-o', `./conversions/${fileId}.html`]);
      
      let result = '';
      let err = '';
    
      process.stdout.on( 'data', data => {
        result += data;
      });
    
      process.stderr.on( 'data', data => {
        err += data;
      });
    
      process.on( 'close', code => {
        console.log( `child process exited with code ${code}` );
        if (err !== '') {
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      });
  
    }

  });

});

const port = process.argv[2] || 46536;
server.listen(port, function() {
  console.log(`server started on ${port}`);
});
