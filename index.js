const express = require('express');
const {google} = require('googleapis');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// 配置服务账户密钥
const keys = require('./path-to-your-service-account-key.json'); // 更改为你的密钥文件路径

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({version: 'v4', auth: client});

const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // 更改为你的 Sheets ID

// 点赞接口
app.post('/like', async (req, res) => {
  const { imageId } = req.body; // 假设前端发送的数据包含图片的 ID
  
  try {
    // 读取当前的点赞数
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `A:B`, // 假设图片 ID 在 A 列，点赞数在 B 列
    });

    const rows = response.data.values;
    let rowIndex = rows.findIndex(row => row[0] === imageId);
    let likes = parseInt(rows[rowIndex][1], 10) + 1;

    // 更新点赞数
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `B${rowIndex + 1}`, // 因为 Sheets API 是从 1 开始计数的
      valueInputOption: 'RAW',
      requestBody: {
        values: [[likes]],
      },
    });

    res.send({ success: true, likes });
  } catch (error) {
    console.error('The API returned an error: ' + error);
    res.send({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
