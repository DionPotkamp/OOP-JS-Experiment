let webBasket = function () {
    let prefix = 'webBasket_';

    this.getNamen = function (form) {
        let namen = [];
        for (let x = 0, len = form.elements.length; x < len; x++) {
            namen.push(form.elements[x].name);
        }
        return namen;
    };

    this.getValues = function (form) {
        let values = [];
        for (let x = 0, len = form.elements.length; x < len; x++) {
            values.push(form.elements[x].value);
        }
        return values;
    };

    this.addItem = function (form) {
        let namen = this.getNamen(form);
        let values = this.getValues(form);
        let item = "{";
        for (let x = 0, len = values.length; x < len; x++) {
            if (x === values.length - 1) {
                item += '"' + namen[x] + '":"' + values[x] + '"}';
            } else {
                item += '"' + namen[x] + '":"' + values[x] + '",';
            }
        }
        localStorage.setItem(prefix+values[0], item);
    };

    this.viewBasket = function () {

        let basketTable = document.getElementById('basketTable');
        let table =
            '<table class="table table-hover">' +
                '<thead>' +
                    '<tr>' +
                        '<th scope="col">#</th>' +
                        '<th scope="col">Product</th>' +
                        '<th scope="col">Model</th>' +
                        '<th scope="col">Prijs</th>' +
                        '<th scope="col">Aantal</th>' +
                        '<th scope="col">&nbsp;</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>';
        let total = 0;

        //door elk item in de localStorage loopen
        for (let x = 0, j = localStorage.length; x < j; x++) {
            //a.d.h.v. de key de value ophalen
            let key = localStorage.key(x);
            if (!key.includes(prefix)) continue;
            let object = localStorage.getItem(key);
            //continue als dit object leeg is
            if (object === null) continue;
            let item = JSON.parse(object);

            table += '<tr>';
            //Keys van object loopen, deze in de tabel zetten
            let subTotal = 0;
            let amount = 0;
            Object.keys(item).forEach(function (key) {
                table += '<td>' + item[key] + '</td>';
                if (key === 'prijs') subTotal += parseInt(item[key]);
                if (key === 'aantal') amount += parseInt(item[key]);
            });
            total += subTotal * amount;

            table += '<td onclick="basket.deleteItem(\'' + prefix+item['id'] + '\')" style="cursor: pointer;"><i class="far fa-trash-alt"></i></td>';
            table += '</tr>';
        }

        table +=
                    '<tr>' +
                        '<td colspan="3" class="text-right">' +
                            'Totaal:' +
                        '</td>' +
                        '<td colspan="3" class="text-left">' +
                            '€'+total+'' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>';
        basketTable.innerHTML = table;
    };

    this.deleteItem = function (key) {
        localStorage.removeItem(key);
        this.viewBasket();
    };

    this.emptyBasket = function () {
        localStorage.clear();
        this.viewBasket();
    };
    
};

const basket = new webBasket();
