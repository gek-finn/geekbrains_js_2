const goods = [
    { title: 'Shirt', price: 150 + ' $' },
    { title: 'Socks', price: 150 + ' $' },
    { title: 'Jacket', price: 150 + ' $'  },
    { title: 'Shoes', price: 150 + ' $' },
];

const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><img src="img/shirt.jpg" alt="shirt img"><div class="desc"><h3>${title}</h3><p>${price}</p><button class="buy-btn">Добавить</button></div></div>`
};

const renderGoodsList = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
};

renderGoodsList(goods);
