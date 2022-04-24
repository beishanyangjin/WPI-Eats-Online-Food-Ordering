var url = window.location.href;
var arg = url.split("?username=");
if (arg.length > 1) {
    var args = arg[1].split("&rid=");
} else {
    var args = ["NULL", 0];
}


var mainapp = new Vue({
    el: ".app",
    data: {
        islogin: false,
        isshowcart: false,
        userid: "login",
        directurl: "login.html",
        //r: "",
        searchContent: "",
        rimformation: [
            { rid: "0003", rank: "4.5", name: "burger king", imgref: "restaurant.webp", delivertime: "22", deliverfee: "1" },
            { rid: "0004", rank: "4.5", name: "wendy's", imgref: "Coke.webp", delivertime: "20", deliverfee: "2" },
            { rid: "0005", rank: "4.5", name: "Starbucks's", imgref: "big-mac-meal.webp", delivertime: "15", deliverfee: "0" },
            { rid: "0003", rank: "4.5", name: "burger king", imgref: "restaurant.webp", delivertime: "22", deliverfee: "1" },
            { rid: "0004", rank: "4.5", name: "wendy's", imgref: "Coke.webp", delivertime: "20", deliverfee: "2" },
            //{rid:"0005",name: "Starbucks's",imgref:"img/big-mac-meal.webp",delivertime:"15",deliverfee:"0"}
        ],
        rsearch: [
            { rid: "0003", rank: "4.5", name: "burger king", imgref: "restaurant.webp", delivertime: "22", deliverfee: "1" },
            { rid: "0004", rank: "4.5", name: "wendy's", imgref: "Coke.webp", delivertime: "20", deliverfee: "2" },

        ],
        fimformation: [
            { fid: "0003", rid: "0003", rank: "4.5", selled_quatity: 33, price: 3.5, name: "burger king", imgref: "restaurant.webp", delivertime: "22", deliverfee: "1", selled_quality: 7 },
            { fid: "0004", rid: "0003", rank: "4.5", selled_quatity: 32, price: 13.5, name: "wendy's", imgref: "Coke.webp", delivertime: "20", deliverfee: "2", selled_quality: 17 },
            { fid: "0005", rid: "0003", rank: "4.5", selled_quatity: 32, price: 8.5, name: "Starbucks's", imgref: "big-mac-meal.webp", delivertime: "15", deliverfee: "0", selled_quality: 23 },
            { fid: "0006", rid: "0003", rank: "4.5", selled_quatity: 14, price: 2.5, name: "burger king", imgref: "restaurant.webp", delivertime: "22", deliverfee: "1", selled_quality: 73 },


            //{rid:"0005",name: "Starbucks's",imgref:"img/big-mac-meal.webp",delivertime:"15",deliverfee:"0"}
        ],
        //cart.item:{ fid: string, fname: string, quatity: int, price:  }
        cart: new Array,
        /*
            {
                
                rid:"",
                name: "",
                imgref:"",
                deliverfee:""
                
            },*/
    },
    methods: {
        tosearch: function() {
            window.location.href = "https://www.baidu.com/s?wd=" + this.searchContent
        },
        addtoCart: function(foodid) {
            var newfood = this.fimformation.find(item => item.fid == foodid);

            //here lack a judgement function on whether food from same restaurant
            if (this.cart.length == 0) {
                this.cart.push({ fid: foodid, fname: newfood.name, quatity: 1, price: newfood.price })
            } else {
                if ((a = this.cart.findIndex(item => item.fid == foodid)) == -1) {
                    this.cart.push({ fid: foodid, fname: newfood.name, quatity: 1, price: newfood.price })
                } else {
                    this.cart[a].quatity += 1;
                }
            }
        },
        showcart: function() {
            this.isshowcart = true
        },
        closecart: function() {
            this.isshowcart = false
        },
        cancelitem: function(foodid) {
            this.cart.splice(this.cart.findIndex(item => item.fid == foodid), 1)
        },
        cancelall: function() {
            this.cart = new Array;
        },
        Checkout: function() {
            var balance = 100;
            balance -= this.money
            window.alert("you payed $" + this.money)
            this.cart = new Array;
            window.location.href = "orderstatus.html?username=" + this.userid
        },
        torestaurant: function(id) {
            window.location.href = "menu.html?username=" + this.username + "&rid=" + id
        },
        /* 
        getrestaurant: function() {
            axios.get("https://autumnfish.cn/api/joke")
            .then(function(response){
                response.data
            } )
            .catch(function(err))
        }
        */
        test: function() {
            var that = this
            axios.post('/ridRestaurant', {
                    Security_id: "u3",
                    query: "101"
                })
                .then(function(response) {
                    //this.isSuccess = response.data;
                    console.log(response.data.restaurants[0].R_name)
                    that.id = response.data.restaurants[0].R_id
                    that.name = response.data.restaurants[0].R_name
                    that.ref = response.data.restaurants[0].R_Image_Reference
                    that.rimformation.push({ rid: that.id, rank: 4.2, name: that.name, imgref: that.ref, delivertime: "20", deliverfee: "1.5" })
                })
                .catch(function(err) {
                    this.isSuccess = "err";
                });
            axios.post('/ridFood', {
                    Security_id: "u3",
                    query: "1001"
                })
                .then(function(response) {
                    //this.isSuccess = response.data;
                    for(var i=0;i<8;i++){
                    console.log(response.data.foods[i])
                    var newfid = response.data.foods[i].F_id
                    var newfname = response.data.foods[i].F_name
                    var newfimgref = response.data.foods[i].F_Image_Reference
                    that.fimformation.push({
                        fid: newfid,
                        rid: "0",
                        rank: "4.1",
                        selled_quality: 32,
                        price: Math.ceil(Math.random() * 10),
                        name: newfname,
                        imgref: newfimgref,
                        delivertime: 10 + Math.ceil(Math.random() * 10),
                        deliverfee: "1"
                    }, )}
                })
                .catch(function(err) {
                    this.isSuccess = "err";
                });
        }
    },
    computed: {
        mainpageurl: function() {
            return "mainpage.html?username=" + this.username
        },
        rid: () => {
            if (args[1]) return args[1];
            else return null;
        },
        username: function() {
            if (args[0] != "login" && args[0] != "NULL") {
                this.userid = args[0];
                this.directurl = "profile.html?username=" + this.userid;
                return args[0];
            } else {
                return "login";
            }
        },

        money: function() {
            var m = 0;
            var i = 0;
            while (this.cart[i]) {
                m += this.cart[i].quatity * this.cart[i].price;
                i++
            }
            return m;
        }
    }

})