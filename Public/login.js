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
        password: "",
        isSuccess: "Fail to login",
        isShow: false,
        balance: 0
    },
    methods: {
        submitloginimf: function() {
            axios.post('https://autumnfish.cn/api/joke', {
                    data: {
                        uid: this.id,
                        password: this.password
                    }
                })
                .then(function(response) {
                    //this.isSuccess = response.data;
                    console.log(response)
                })
                .catch(function(err) {
                    this.isSuccess = "err";
                });
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
            this.balance += 100;
        },
    },
    computed: {
        mainpageurl: function() {
            return "mainpage.html?username=" + this.id
        },
    }

})