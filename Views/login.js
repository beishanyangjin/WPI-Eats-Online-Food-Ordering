var app = new Vue({
    el: ".box",
    data: {
        id: "",
        password: "",
        isSuccess: "Fail to login",
        isShow: false
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
        }
    }

})