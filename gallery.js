document.addEventListener('DOMContentLoaded', function() {

  const sheetId = '1EJPFPdGzXBwTCQUBxBV9MvlRq62vPvSXxjnsqTYfk2k';
  const apiKey = '02102f9cafe912c4e0ade57db08329d98720f757';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${1EJPFPdGzXBwTCQUBxBV9MvlRq62vPvSXxjnsqTYfk2k}/values/Sheet1!A2:D?key=${02102f9cafe912c4e0ade57db08329d98720f757}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rows = data.values; // 获取数据行
      const galleryElement = document.getElementById('gallery'); // 获取gallery元素

      // 清空gallery元素内部的HTML
      galleryElement.innerHTML = '';

      // 为每一行数据创建一个卡片并添加到gallery中
      rows.forEach(row => {
        const [id, imageUrl, description, likes] = row;
        const cardHtml = `
          <div class="card">
            <img src="${imageUrl}" alt="${description}">
            <p>${description}</p>
            <p>Likes: ${likes}</p>
            <button onclick="increaseLikes('${id}')">Like</button>
          </div>
        `;
        galleryElement.innerHTML += cardHtml; // 将卡片添加到gallery
      });
    })
    .catch(error => console.error('Error:', error)); 

  // 点赞功能示例函数
  function increaseLikes(id) {
    console.log(`增加ID为${id}的图片的点赞数`);
    // 这里可以添加代码来处理点赞逻辑，比如发送请求到服务器更新点赞数
  }
});
