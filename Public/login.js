var url = window.location.href;
var arg = url.split("?username=");
if (arg.length > 0) {
    var args = arg[1]
} else {
    var args = [0, 0];
}
var app = new Vue({
    el: ".box",
    data: {
        id: args,
        password: "",
        isSuccess: "Fail to login",
        isShow: false,
        balance: 0
    },
    methods: {
        submitloginimf: function() {
            /*
            axios.post('searchRestaurant',
                {
                    Security_id: "u3",
                    Password_id: "11",
                    user_name: "user_name",
                    user_phone: "user_phone",
                    address:"address3",
                    query: this.id
                })

                .then(function(response) {
                    //this.isSuccess = response.data;
                    console.log(response)
                })
                .catch(function(err) {
                    this.isSuccess = "err";
                });
                */
            console.log(this.id)
            this.isShow = true
        },
        submitsignimf: function() {
            //post(id: id, password: password)
            //get(id: id, password: password)
            //.then( function(response)
            //  console.lod(success)
            //).catch(function(err){})
            console.log(this.id)
            this.isShow = true
        },
        addbalance: function() {
            axios.post('/cidBalance', {
                    amount: 25,
                    query: "101"
                })
                .then(function(response) {
                    //this.isSuccess = response.data;
                    console.log(response)
                })
                .catch(function(err) {
                    this.isSuccess = "err";
                });
            axios.post('/cidCustomer', {
                    query: "101"
                })
                .then(function(response) {
                    //this.isSuccess = response.data;
                    console.log(response)
                    this.balance = response.Balance
                })
                .catch(function(err) {
                    this.isSuccess = "err";
                });

        },
        tomycoupon: function() {
            window.location.href = "mycoupon.html?username=" + this.username
        }
    },
    computed: {
        mainpageurl: function() {
            return "mainpage.html?username=" + this.id
        }
    }
})