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