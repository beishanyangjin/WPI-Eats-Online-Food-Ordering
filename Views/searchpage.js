var url = window.location.href;
var arg = url.split("?username=");
if (arg.length > 1) {
    var args = arg[1].split("&searchkey=");
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
        searchContent: args[1],
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
    },
    computed: {
        mainpageurl: function() {
            return "mainpage.html?" + this.username
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
        },
        rsearch: function() {
            axios.post('http://127.0.0.1:3000/searchRestaurant', {
                    Security_id: "u3",
                    Password_id: "11",
                    user_name: "user_name",
                    user_phone: "user_phone",
                    address: "address3",
                    query: this.searchContent
                })
                .then(function(response) {
                    //this.isSuccess = response.data;
                    console.log(response)
                })
                .catch(function(err) {
                    this.isSuccess = "err";
                });
            return [
                { rid: "0003", rank: "4.5", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
                response.Restsurant[0]
            ]
        },

    }

})