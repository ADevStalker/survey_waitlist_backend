const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const { default: axios } = require('axios');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(bodyParser.json());

app.use(cors());

app.post('/send-email', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.postmarkapp.com/email',
      {
        From: 'test@link-up.se',
        // Eliassulaiman175@gmail.com
        To: 'anthonydicker94@gmail.com',
        Subject: 'Postmark test',
        TextBody: 'Hello dear Postmark user.',
        HtmlBody: `<html>
            <body>
              <strong>From</strong> ${req.body.mail}.<br/>
              <ol class='font-normal text-gray-700 dark:text-gray-400 space-y-4 list-disc list-inside'>
              ${Object.keys(req.body.survey).map(
                (key) =>
                  `<li> 
                  ${key} 
                  <br /> ${req.body.survey[key]} 
                </li>`
              )}
            </ol>
            </body>
          </html>`,
        MessageStream: 'outbound',
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': '5edbb48b-89c8-4013-acc8-f887b0699363',
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
