var prodactData = new Array();
function post(url) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        var obj = JSON.parse(req.responseText);
        for (item in obj)
            prodactData.push(obj[item]);
        new Vue({
            el: "#vue-app",
            data: {
                prodacts: prodactData,
                busket: new Array()
            },
            computed: {
                busketCount: function () {
                    var count = 0;
                    for (var i = 0; i < this.busket.length; i++)
                        count += this.busket[i].count;
                    return count;
                },
                prodactsCount: function () {
                    return this.prodacts.length;
                }
            },
            methods: {
                addInBusket: function (item) {
                    for (var i = 0; i < this.busket.length; i++)
                        if (this.busket[i].prodact.id === item.id) {
                            this.busket[i].count++;
                            return;
                        }
                    this.busket.push({
                        prodact: item,
                        count: 1
                    });
                }
            }
        });
    };
    req.send();
}
post("data.json");
