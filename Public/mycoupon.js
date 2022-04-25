var url = window.location.href;
var arg = url.split("?username=");
if (arg.length > 0) {
    var args = arg[1]
} else {
    var args = login;
}

var app = new Vue({
    el: ".box",
    data: {
        coupons: [{
            coupon_id: "211241",
            discount: "20%",
            restaurant: "Mcdonalds",
            expiredate: "04/26/2022"
        }],
        couponsgot: [{
                coupon_id: "211241",
                discount: "20%",
                restaurant: "Mcdonalds",
                expiredate: "04/26/2022"
            },
            {
                coupon_id: "200011",
                discount: "10%",
                restaurant: "Mcdonalds",
                expiredate: "04/28/2022"
            }
        ],
        mainpageurl: "mainpage.html?username=" + args,
        mycouponurl: "mycoupon.html?username=" + args,
    },
    methods: {
        getcoupon: function() {
            /*
            this.coupons.push({
                coupon_id: "200011",
                discount: "10%",
                restaurant: "Mcdonalds",
                expiredate: "04/28/2022"
            })*/
            window.alert("claimed")
        }
    }

})