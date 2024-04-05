const { GoogleSpreadsheet } = require('google-spreadsheet');
const serviceAccount = require('./path/to/service-account-key.json');

document.addEventListener('DOMContentLoaded', function() {
  async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1EJPFPdGzXBwTCQUBxBV9MvlRq62vPvSXxjnsqTYfk2k');

    try {
      // 使用服务帐号凭据进行身份验证
      await doc.useServiceAccountAuth({
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      });

      // 加载文档信息
      await doc.loadInfo();

      // 获取表格
      const sheet = doc.sheetsByIndex[0];

      // 读取数据
      const rows = await sheet.getRows();

      // 获取gallery元素
      const galleryElement = document.getElementById('gallery');

      // 清空gallery元素内部的HTML
      galleryElement.innerHTML = '';

      // 为每一行数据创建一个卡片并添加到gallery中
      rows.forEach(row => {
        const cardHtml = `
          <div class="card">
            <img src="${row.imageUrl}" alt="${row.description}">
            <p>${row.description}</p>
            <p>Likes: ${row.likes}</p>
            <button onclick="increaseLikes('${row.id}')">Like</button>
          </div>
        `;
        galleryElement.innerHTML += cardHtml; // 将卡片添加到gallery
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // 页面加载完成时，调用访问表格的函数
  accessSpreadsheet();

  // 点赞功能示例函数
  function increaseLikes(id) {
    console.log(`增加ID为${id}的图片的点赞数`);
    // 这里可以添加代码来处理点赞逻辑，比如发送请求到服务器更新点赞数
  }
});
