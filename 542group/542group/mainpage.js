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
        userid: "login",
        directurl: "login.html",
        //r: "",
        searchContent: "",
        rimformation: [
            { rid: "0003", rank: "4.5", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
            { rid: "0004", rank: "4.5", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
            { rid: "0005", rank: "4.5", name: "Starbucks's", imgref: "img/big-mac-meal.webp", delivertime: "15", deliverfee: "0" },
            { rid: "0003", rank: "4.5", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
            { rid: "0004", rank: "4.5", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
            { rid: "0005", rank: "4.5", name: "Starbucks's", imgref: "img/big-mac-meal.webp", delivertime: "15", deliverfee: "0" },
            { rid: "0003", rank: "4.5", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
            { rid: "0004", rank: "4.5", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
            //{rid:"0005",name: "Starbucks's",imgref:"img/big-mac-meal.webp",delivertime:"15",deliverfee:"0"}
        ],
        fimformation: [
            { fid: "0003", rank: "4.5", selled_quality: "33", price: "3.50", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
            { fid: "0004", rank: "4.5", selled_quality: "32", price: "13.50", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
            { fid: "0005", rank: "4.5", selled_quality: "32", price: "8.50", name: "Starbucks's", imgref: "img/big-mac-meal.webp", delivertime: "15", deliverfee: "0" },
            { fid: "0006", rank: "4.5", selled_quality: "14", price: "2.50", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
            { fid: "0007", rank: "4.5", selled_quality: "32", price: "8.50", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
            { fid: "0008", rank: "4.5", selled_quality: "32", price: "7.50", name: "Starbucks's", imgref: "img/big-mac-meal.webp", delivertime: "15", deliverfee: "0" },
            { fid: "0009", rank: "4.5", selled_quality: "28", price: "8.50", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
            { fid: "0011", rank: "4.5", selled_quality: "32", price: "11.50", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
            //{rid:"0005",name: "Starbucks's",imgref:"img/big-mac-meal.webp",delivertime:"15",deliverfee:"0"}
        ],
        //cart.item:{foodid: fid, quality: num, price: price}
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
            //here lack a judgement function on whether food from same restaurant
            if (this.cart.length == 0) {
                this.cart.push({ fid: foodid, quality: 1, price: 2.2 })
            } else {
                if ((a = this.cart.findIndex(item => item.fid == foodid)) == -1) {
                    this.cart.push({ fid: foodid, quality: 1, price: 2.2 })
                } else {
                    this.cart[a].quality += 1;
                }
            }
        }
    },
    computed: {
        rid: () => {
            if (args[1]) return args[1];
            else return null;
        },
        username: function() {
            if (args[0] != "NULL") {
                this.userid = args[0];
                this.directurl = "";
                return args[0];
            } else {
                return "login";
            }
        }
    }

})