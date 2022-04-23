var url = window.location.href;
var arg = url.split("?username=");
if (arg.length > 0) {
    var args = arg[1];
} else {
    args = [0, '']
}

var app = new Vue({
    el: ".box",
    data: {
        id: args,
        orderstatus: "Preparing Food"
    },
    methods: {
        Cancel: function() {
            window.location.href = "mainpage.html?username=" + this.id
        },
        orderprogress: function() {
            if (this.orderstatus == "Preparing Food") {
                this.orderstatus = "Waiting for driver"
            } else if (this.orderstatus == "Waiting for driver") {
                this.orderstatus = "Delivering"
            } else {
                this.orderstatus = "Food Delivered"
            }
        }
    },
    computed: {
        mainpageurl: function() {
            return "mainpage.html?username=" + this.id
        },

        orderid: function() {
            //get
            return "49616685168"
        }
    }

})