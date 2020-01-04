const cart = [];

Vue.component('search', {
  props: ['searchLine'],
  template: `
      <form class="search-form" @submit.prevent>
        <input type="text" class="search-input" :value="searchLine"
         @input="updateSearchLine"/>
      </form>
      `,
  methods: {
    updateSearchLine(val) {
      const value = val.target.value;
      this.$emit('update:searchLine', value);
    }
  }
});

Vue.component('cart', {
  data: () => ({
    cart,
    isVisibleCart: false,    
  }),
  methods: {
    toggleVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
    },
    
    decCount(good) {
      if (good.count === 1) {
        this.cart.splice(this.cart.indexOf(good), 1);
        if (this.cart.length === 0) {
          this.isVisibleCart = !this.isVisibleCart;
        }
      } else {
        good.count--;
      }
    },
    incCount(good) {
      good.count++;
    },
    
  },
  computed: {
    cartSumm() {
      let csum = 0;
      this.cart.forEach(elem => csum += elem.price * elem.count);
      return csum;
    },   

  },
  template: `
      <div class="cart-block" v-if="isVisibleCart">        
          <div class="cart-item" v-for = "good in cart">
            <h3>{{good.product_name}}</h3>
            <p class="good-price">{{ good.price }}</p>
            <button class="goods-dec" @click="decCount(good)">-</button>
            <span class="goods-count">{{ good.count }}</span>
            <button class="goods-inc" @click="incCount(good)">+</button>
          </div>
          <div class="cart-sum">ИТОГО: {{cartSumm}} ₽</div>
      </div>
      `
});

Vue.component('goods-item', {
  props: ['good'],
  methods: {
    addGoodToCart(good) {
      let goodPos = this.findGoodPos(good.id_product);
      if ( goodPos >= 0){
          cart[goodPos].count++;
      } else {          
          const cartItem = Object.assign({}, good, {count: 1});
          cart.push(cartItem);
      }
  },
  findGoodPos(id_product){
    
    let goodIdx = -1;
    cart.forEach((item, index) => {
        if (item.id_product == id_product) {
            goodIdx = index;
        }
    });
    return goodIdx;
},
  },
  template: `
    <div class="goods-item">
        <img src="img/comp.jpg" alt="img" class="goods-img">
        <h3 class = "title good-title">{{ good.product_name }}</h3>
        <p class="good-title">{{ good.price }}</p>
        <button @click ="addGoodToCart(good)">Добавить</button>
    </div>
  `,
});

Vue.component('goods-list', {
  props: ['goods'],
  computed: {
    isGoodsEmpty() {
      return this.goods.length === 0;
    }
  },
  template: `
    <div class="goods-list" v-if="!isGoodsEmpty">
      <goods-item v-for="good in goods" :good="good" :key="good.id_product"></goods-item>
    </div>
    <div class="not-found-items" v-else>
      <h2>Нет данных</h2>
    </div>
  `,
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
    isVisibleCart: false,
    itemCart: {
      amount: 0,
      countItems: 0,
      products: []
    },
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const body = JSON.parse(xhr.responseText);
              resolve(body)
            } else {
              reject(xhr.responseText);
            }
          }
        };
        xhr.onerror = function (err) {
          reject(err);
        };

        xhr.open('GET', url);
        xhr.send();
      });
    },
    makePOSTRequest(url, data) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const body = JSON.parse(xhr.responseText);
              resolve(body)
            } else {
              reject(xhr.responseText);
            }
          }
        };
        xhr.onerror = function (err) {
          reject(err);
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(data);
      });
    },
    toggleCartVisibility() {
      this.$refs.cart.toggleVisibility();
    },
  },
  computed: {
    filteredGoods() {
      const searchValue = this.searchLine.replace(/[\*]/gi, '');
      const regexp = new RegExp(searchValue, 'i');
      return this.goods.filter((good) => regexp.test(good.product_name));
    },
  },
  async mounted() {
    try {
      this.goods = await this.makeGETRequest(`/catalog`);
    } catch (e) {
      console.error(e);
    }
  }
});
