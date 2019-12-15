class GoodsItem {
     constructor(code = 0, title = 'Без имени', price = '', prodimg = "img/shirt.jpg") {
        this.code = code;
        this.title = title;
        this.price = price;
        this.prodimg = prodimg;
    }
    render() {
        return `<div class="goods-item"><img src=${this.prodimg} class = "goods-img" alt="shirt_img"><div class="desc"><h3 class="title goods-title">${this.title}</h3><p>${this.price} ₽</p><button class="buy-btn" id=${this.code}>Добавить</button></div></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            {
                code: 1,
                title: 'Shirt',
                price: 150
            },
            {
                code: 2,
                title: 'Socks',
                price: 150
            },
            {
                code: 3,
                title: 'Jacket',
                price: 150
            },
            {
                code: 4,
                title: 'Shoes',
                price: 150
            },
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

                if (isNaN(good.price)) {} else {
                    sum += good.price;
                }
            });
        document.querySelector('.header-upper').innerHTML = `Сумма всех товаров: ${sum}`;
    }

    searchGood(code) {
        let foundGood = {};
        this.goods.forEach(elem => {
            if (elem.code === code) {
                foundGood = elem;
            }
        });
        return foundGood;
    }

    setEventListeners(cartObj) {
        let btns = document.querySelectorAll('.buy-btn');
        btns.forEach(btn => {
            let btnId = +btn.id;
            let btnGood = this.searchGood(btnId);
            if (btnGood) {
                btn.addEventListener('click', function () {
                    cartObj.add2Cart(btnGood);
                });
            }
        });
    }
}

//const list = new GoodsList();
//list.fetchGoods();
//list.render();
//list.sumGoods();

//Класс для добавления новых элементов в корзине
class CartItem {
    constructor(code = 0, title = 'Без имени', price = '', prodimg = "img/shirt.jpg", count = 0) {
        this.code = code;
        this.title = title;
        this.price = price;
        this.prodimg = prodimg;
        this.count = count;
    }
    render() {
        //возвращает строку таблицы
        return `<tr><td><img src=${this.prodimg} class="cart-img"></td>
                    <td><span class="cart-title">${this.title}</span></td>
                    <td><span class="cart-price">${this.price}₽</span></td>
                    <td><span class="cart-count" id="count${this.code}">${this.count}</span></td>
                    <td><button class="inc-good" id="inc${this.code}">+</button>
                        <button class="dec-good" id="dec${this.code}">-</button>
                    </td>
                 </tr>`;
    }
}
//Класс содержащий массив товаров с функцией подсчета товаров и суммы

class Cart {
    constructor() {
        this.goods = [];
    }
    findGoodPos(code) {

        let goodIdx = -1;
        this.goods.forEach((item, index) => {
            if (item.code == code) {
                goodIdx = index;
            }
        });
        return goodIdx;
    }
    /**
     * Функция  при нажатии на кнопку "Добавить"
     * @param item
     */
    add2Cart(item) {
        let goodPos = this.findGoodPos(item.code);
        if (goodPos >= 0) {
            this.goods[goodPos].count++;
        } else {
            //Тут нужно создать новый объект класса CartItem, копируя свойства соответствующего объекта GoodsItem
            let cartItem = new CartItem(item.code, item.title, item.price);
            cartItem.count = 1;
            this.goods.push(cartItem);
        }
    }
    getSum() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price * good.count;
        });
        return sum;
    }
    getCartHeader() {
        return `<tr><th class="cart-th">Продукт</th>
                    <th class="cart-th">Наименование</th>
                    <th class="cart-th">Цена</th>
                    <th class="cart-th">Количество</th>
                    <th class="cart-th"></th>
                  </tr>`;
    }
    IncGood(btnId) {
        let btncode = +btnId.replace("inc", "");
        let gpos = this.findGoodPos(btncode);
        this.goods[gpos].count++;
        document.getElementById(`count${btncode}`).innerText = this.goods[gpos].count;
        document.querySelector('.cart-sum').innerHTML = `ИТОГО: ${this.getSum()}₽`;
    }
    setIncGoodEvent() {
        let incBtns = document.querySelectorAll('.inc-good');
        incBtns.forEach(btn => {
            btn.addEventListener('click', elem => this.IncGood(elem.target.id));
        });
    }
    searchCartRow(btnId) {
        let decBtns = document.querySelectorAll('.dec-good');
        decBtns.forEach((btn, index) => {
            if (btn.id == btnId) {
                return index;
            } else {
                return -1;
            }
        });
    }
    deleteCartRow(btn) {
        /*let row = this.searchCartRow(btnId);
        if (row >= 0){
        }*/
        let row = btn.parentElement.parentElement;
        row.parentElement.removeChild(row);
    }
    DecGood(btn) {
        let btncode = +btn.id.replace("dec", "");
        let gpos = this.findGoodPos(btncode);
        this.goods[gpos].count--;
        if (this.goods[gpos].count > 0) {
            document.getElementById(`count${btncode}`).innerText = this.goods[gpos].count;
        } else {
            this.goods.splice(gpos, 1);
            this.deleteCartRow(btn);
        }
        document.querySelector('.cart-sum').innerHTML = `ИТОГО: ${this.getSum()}₽`;
    }
    setDecGoodEvent() {
        let decBtns = document.querySelectorAll('.dec-good');
        decBtns.forEach(btn => {
            btn.addEventListener('click', elem => this.DecGood(elem.target));
        });
    }
    render() {
        let listHtml = `<table class="cart-table">${this.getCartHeader()}`;
        this.goods.forEach(good => {
            // const cartItemI = new CartItem(good.title, good.price);
            listHtml += good.render();
        });
        listHtml += `</table>
                    <p class="cart-sum"> ИТОГО: ${this.getSum()} ₽</p>`;
        document.querySelector('.cart-inner').insertAdjacentHTML('beforeEnd', listHtml);
        this.setIncGoodEvent();
        this.setDecGoodEvent();
    }
    /**
     *  Устанавливаем на кнопку "Корзина" событие - при нажатии на кнопку открываем корзину
     * @param cartObj
     */
    cartBtnSetEvent() {
        let cartBtn = document.querySelector('.cart-button');
        let cartTag = document.querySelector('.cart-bck');
        cartBtn.addEventListener('click', elem => {
            this.render();
            cartTag.classList.remove('hidden');
        });
    }
    clearCartHTML() {
        //let cartTable = document.querySelector('.cart-table');
        //cartTable.innerHTML = this.getCartHeader();
        let cartHtml = document.querySelector('.cart-inner');
        cartHtml.innerHTML = "";
    }
    /**
     * Устанавливаем на кнопку закрытия корзины событие - при нажатии на кнопку закрываем корзину
     * и подчищаем HTML-разметку страницы, чтобы при новом открытии корзины перерисовать ее заново
     * @param cartObj
     */
    cartCloseBtnSetEvent() {
        let cartCloseBtn = document.querySelector('.cart-close');
        let cartBck = document.querySelector('.cart-bck');
        cartCloseBtn.addEventListener('click', elem => {
            cartBck.classList.add('hidden');
            this.clearCartHTML();
        });
    };
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumGoods();

const prodCart = new Cart();
list.setEventListeners(prodCart);
prodCart.cartBtnSetEvent();
prodCart.cartCloseBtnSetEvent();
