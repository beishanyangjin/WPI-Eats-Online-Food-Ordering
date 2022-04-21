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
            //post(id: id, password: password)
            //get(id: id, password: password)
            //.then( function(response)
            //  console.lod(success)
            //).catch(function(err){})
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