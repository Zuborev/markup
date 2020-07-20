"use strict";

function getAddressDiv(addArr) {
    let information = ((addArr.text_info == null) || (addArr.text_info == '')) ? "" : ', ' + addArr.text_info;
    let div = `<div class="item">
                <h3>${addArr.name}</h3>
                <p>${addArr.city}, ${addArr.area}, ${addArr.street}, ${addArr.house} ${information}</p>
                <div class="actbox">
                <a href="#" class="bcross"></a>
                </div>
            </div>`
    return div;
}

function renderAddressList(arr) {
    let divElement = $("div.uo_adr_list").empty();
    if (arr.length == 0) {
        divElement.text('There is nothing here yet');
    } else {
        let i = 0;
        arr.forEach(function () {
            let divFinal = getAddressDiv(arr[i]);
            divElement.append(divFinal);
            i += 1;
        })
    }
}

function refreshAddressList() {
    $.ajax({
        url: '/db/list.php',
        method: "POST",
        success: function (data) {
            // console.log(data);
            let result = JSON.parse(data);
            renderAddressList(result);
            // console.log(result);
        },
        error: function () {
            alert('Error! Problem with DB.');
        }
    });
}

function validate(obj) {
    let errorArr = [];
    for (let key in obj) {
        if (obj[key] == "") {
            errorArr.push(key);
        }
    }
    return errorArr;
}

function renderError(array) {
    $("#errors").text('Next fields are empty:');
    array.forEach(function (item, i, arr) {
        $("#errors").append(`<li>${item};</li>`);
    })
}

$(function () {

    refreshAddressList();

    $("input.green_btn").on("click", function (e) {

        e.preventDefault();
        $("#messages").html("");
        $("#errors").html("");

        let name = $("input[name = 'name']").val().trim();
        let city = $("select[name = 'city']").children("option:selected").text();
        let area = $("select[name = 'area']").children("option:selected").text();
        let street = $("input[name = 'street']").val().trim();
        let house = $("input[name = 'house']").val().trim();
        let info = $("textarea[name = 'info']").val().trim();
        let dataObj = {
            'name': name,
            'city': city,
            'area': area,
            'street': street,
            'house': house
        };

        let errArray = (validate(dataObj));

        if (errArray.length != 0) {
            renderError(errArray);
        } else {

            $.ajax({
                url: '/db/add.php',
                method: 'POST',
                data: {name, city, area, street, house, info},
                beforeSend: function () {
                    $("input[type = 'button']").prop('disabled', true);
                },
                success: function (data) {
                    refreshAddressList();
                    $("input[type = 'button']").prop('disabled', false);
                    let result = JSON.parse(data);
                    if (0 == result.error) {
                        $("form").trigger('reset');
                        $("#messages").text(result.messages);
                    } else {
                        $("#errors").text(result.messages);
                    }
                },
                error: function () {
                    alert('Error! Repeat please!');
                    $("input[type = 'button']").prop('disabled', false);
                }
            });
        }
    });
});



