// The ajaxGET function from the Week 9 slides: ask the server for something,
// and call the callback with the text that comes back
function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        }
    };
    xhr.open("GET", url);
    xhr.send();
}

// CALL 1: the server sends an HTML table, so we can drop it right in
ajaxGET("/menuhtml", function (data) {
    document.getElementById("menuhtml").innerHTML = data;
});

// CALL 2: the server sends JSON text, so we parse it and build the table ourselves
ajaxGET("/menujson", function (data) {
    let rolls = JSON.parse(data);

    let table = document.createElement("table");

    // header row
    let headings = ["Roll", "Type", "Main ingredient", "Pieces", "Price"];
    let headerRow = document.createElement("tr");
    for (let i = 0; i < headings.length; i++) {
        let th = document.createElement("th");
        th.textContent = headings[i];
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // one row per roll
    for (let i = 0; i < rolls.length; i++) {
        let roll = rolls[i];
        let values = [roll.name, roll.type, roll.ingredient, roll.pieces, "$" + roll.price.toFixed(2)];
        let row = document.createElement("tr");
        for (let j = 0; j < values.length; j++) {
            let td = document.createElement("td");
            td.textContent = values[j];
            row.appendChild(td);
        }
        table.appendChild(row);
    }

    document.getElementById("menujson").appendChild(table);
});