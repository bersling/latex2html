import * as request from 'request';

// TODO: adapt to THIS website, since this was copied from another website.

const options = {
  url: `http://localhost:46254/subscribe?listid=71797e4531`,
  json: true,
  body: {
    EMAIL: 'bersling@gmail.com',
    FNAME: 'da blab',
    DESCR: 'Ich finde das voll spannend und so.'
  },
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  }
};

request(options, function (err, res, body) {
  if (err) {
    console.error('error posting json: ', err);
    throw err
  }
  const headers = res.headers;
  const statusCode = res.statusCode;
  console.log('headers: ', headers);
  console.log('statusCode: ', statusCode);
  console.log('body: ', body);
});
