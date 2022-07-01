let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
    }
    else {
        total.innerHTML = '';
    }
}

let dataPro;   // Array
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);  // Convert Sring to Array of Object
}
else {
    dataPro = [];
}

submit.onClick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData();
    }
    localStorage.setItem('product', JSON.stringify(dataPro)); // Convert Array of Object to String
    console.log(dataPro);
}

function clearData() {

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}

function showData() {
    let table = '';

    getTotal();

    for (let i = 0; i < dataPro.length; i++) {
        table += ` <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick= "updateData(${i})">Update</button></td>
        <td><button id="delete" onClick= "deleteData(${i})">delete</delete></td>
        </tr> `;
    }

    console.log(table);

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick='deleteAll()'> Delete All (${dataPro.length}) </button>`
    } else {
        btnDelete.inerHTML = '';
    }
}

function deleteData(index) {
    dataPro.splice(index, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0); // Clear All 
    showData();
}

function updateData(index) {
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[index].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = index;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
    showData();
}

// Search
let searchMode = 'title';

function getSearchMood(id) {
    let Search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMode = 'title';
        Search.placeholder = 'Search by Title';
    }
    else {
        searchMode = 'category';
        Search.placeholder = 'Search by Category';

    }
    Search.focus();
    Search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
        if (searchMode == 'title') {
            for (let i = 0; i < dataPro.length; i++) {
                if (dataPro[i].title.includes(value.toLowerCase()))
                    table += ` <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick='updateData(${i})'>Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</delete></td>
                    </tr> `;
            }
        }
        else {
            for (let i = 0; i < dataPro.length; i++) {
                if (dataPro[i].category.includes(value.toLowerCase()))
                    table += ` <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick='updateData(${i})'>Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</delete></td>
                    </tr> `;
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
