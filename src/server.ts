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
  console.log('request to translate:', payload)
  const fileId = Math.random().toString(36).substring(7);;
  const inPath = '/tmp/' + fileId + '.tex';
  const outPath = '/tmp/' + fileId + '.html';

  fs.writeFile(inPath, payload.latex, (writeFileError) => {

    console.log('Successfully wrote payload to file for conversion.')

    if (writeFileError) {
      res.status(500).send(writeFileError.message);
    } else {
      try {
        const process = child_process.spawn('pandoc', [inPath, '-o', outPath]);
        let err = '';
        process.stderr.on('data', data => {
          err += data;
        });

        process.on('close', code => {
          console.log(`child process exited with code ${code}`);
          if (err !== '') {
            res.status(500).send(err);
          } else {
            fs.readFile(outPath, (err, data) => {
              if (err) {
                res.status(500).send(err.message);
              } else {
                res.status(200).send(data);
              }
            });

          }
        });
      } catch (err) {
        console.log('An error occurred:', err);
      }

    }

  });

});

const port = process.argv[2] || 46536;
server.listen(port, function () {
  console.log(`server started on ${port}`);
});
