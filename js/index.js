document.querySelector('.cart-button').addEventListener('click', () => {document.querySelector('.cart-block').classList.toggle('invisible');});

class GoodsItem {
    constructor(title = 'Без имени', price = '150') {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><img src="img/shirt.jpg" alt="shirt img"><div class="desc"><h3>${this.title}</h3><p>${this.price} ₽</p><button class="buy-btn">Добавить</button></div></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods()  {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 150 },
            { title: 'Jacket', price: 150 },
            { title: 'Shoes', price: 150 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    
    sumGoods() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        })
        return sum;
        
    }
}
class UserCart {
    
}

const list = new GoodsList();
list.fetchGoods();
list.render();

