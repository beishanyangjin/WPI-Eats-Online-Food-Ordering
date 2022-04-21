var mainapp = new Vue({
    el: ".app",
    data: {
        searchContent: "",
        fimformation: [
                { rid: "0003", quality: "31", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
                { rid: "0004", quality: "31", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
                { rid: "0005", quality: "31", name: "Starbucks's", imgref: "img/big-mac-meal.webp", delivertime: "15", deliverfee: "0" },
                { rid: "0003", quality: "31", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
                { rid: "0004", quality: "31", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
                { rid: "0005", quality: "31", name: "Starbu,cks's", imgref: "img/big-mac-meal.webp", delivertime: "15", deliverfee: "0" },
                { rid: "0003", quality: "31", name: "burger king", imgref: "img/restaurant.webp", delivertime: "22", deliverfee: "1" },
                { rid: "0004", quality: "31", name: "wendy's", imgref: "img/Coke.webp", delivertime: "20", deliverfee: "2" },
                //{rid:"0005",name: "Starbucks's",imgref:"img/big-mac-meal.webp",delivertime:"15",deliverfee:"0"}
            ]
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
        }

    }

})