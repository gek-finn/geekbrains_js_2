const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        goodPicture: 'img/comp.jpg'
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
                            resolve(body);
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.onerror = (err) => {reject(err)};
                xhr.open('GET', url);
                xhr.send();
            });
        },

        filterGoods() {
            const regxp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter((good) => regxp.test(good.product_name));
        }

    },


    async mounted() {
        try {
            this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
            this.filteredGoods = [...this.goods];
        } catch (e) {
            console.error(e);
        }
    }


});
