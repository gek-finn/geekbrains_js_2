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
        this.goods.forEach(
            good => {
            const goodsSum = new GoodsItem(good.price);
            
            if(isNaN(good.price)) {                
            } else {
                sum += good.price;
            }
        });
        document.querySelector('.header-upper').innerHTML = `Сумма всех товаров: ${sum}`;
    }
}

    const list = new GoodsList();
    list.fetchGoods();
    list.render();
    list.sumGoods();

// Пустые классы для корзины согласно п.1 д/з

//Класс для добавления новых элементов в корзине
    class CartItem {
              
    }

//Класс содержащий массив товаров с функцией подсчета товаров и суммы

    class CartCalc {
    
    }
