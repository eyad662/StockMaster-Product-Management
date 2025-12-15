let title = document.getElementById('title')
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


//! Get Total
function calcTotal() {
    let priceValue = +price.value;
    let taxesValue = +taxes.value;
    let adsValue = +ads.value;
    let discountValue = +discount.value;

    if(priceValue){
        const result = priceValue + taxesValue + adsValue - discountValue;
        total.textContent = result;
        total.style.background = '#07682bff'
    }else{
        total.textContent = "";
        total.style.background = '#9c1c1c'
    }
}
price.addEventListener('keyup', calcTotal)
taxes.addEventListener('keyup', calcTotal)
ads.addEventListener('keyup', calcTotal)
discount.addEventListener('keyup', calcTotal)

//! Create Product

let Items;
let stored = localStorage.getItem('item');

if (stored) {
    Items = JSON.parse(stored);
    updateSystem();
} else {
    Items = [];
}

//! Clear inputs
const clearInputs = function(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.textContent = '';
    total.style.background = '#9c1c1c';
}


function updateSystem (){
    document.querySelector('.tbody').innerHTML = '';
    Items.forEach(function(item, i){
        const html = `
        <tr class="single-item">
            <td>${i+1}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.taxes}</td>
            <td>${item.ads}</td>
            <td>${item.discount}</td>
            <td>${item.total}</td>
            <td>${item.category}</td>
            <td><button id="update" data-index="${i}">Update</button></td>
            <td><button id="delete" data-index="${i}">Delete</button></td>
        </tr>`
        
        document.querySelector('.tbody').insertAdjacentHTML('afterbegin', html);
    })
}

let temp;

//! delete
document.querySelector('tbody').addEventListener('click', function(e){
    if(e.target.id === 'delete'){
        const itemRow = e.target.closest('.single-item');
        const id = Number(e.target.dataset.index);
        
        Items.splice(id, 1)
        
        
        localStorage.setItem('item', JSON.stringify(Items))
        updateSystem()
    }
})

//! update
document.querySelector('tbody').addEventListener('click', function(e){
    if(e.target.id === 'update'){
        const id = Number(e.target.dataset.index);
        
        title.value = Items[id].title;
        price.value = Items[id].price;
        taxes.value = Items[id].taxes;
        ads.value = Items[id].ads;
        discount.value = Items[id].discount;
        calcTotal();
        count.style.display = 'none';
        category.value = Items[id].category;
        
        temp = id;
        submit.textContent = 'Update';
    }
})

submit.addEventListener('click', function() {
    if(title.value && price.value && category.value){
        let newItem = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.textContent,
            count: count.value || 1,
            category: category.value.toLowerCase()
        }
        if(submit.textContent === 'Create'){
            while (newItem.count >= 1) {
                Items.push({...newItem});
                newItem.count--;
        }} else{
            Items[temp] = newItem;
            Items[temp].count = 1;
            submit.textContent = 'Create';
            count.style.display = 'block';
        }
        
        //! Sava to Localstorage
        localStorage.setItem('item', JSON.stringify(Items))
        
        updateSystem();
        clearInputs();
    } else {
        if(!title.value) title.style.borderColor = 'red';
        if(!price.value) price.style.borderColor = 'red';
        if(!category.value) category.style.borderColor = 'red';
    }
})


//! Read
//! count


//! search

let searchMood = 'title';

document.querySelector('.btnSearch').addEventListener('click', function(e){
    const id = e.target.id;
    let search = document.getElementById('search');
    if(id === 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Seach by Title';
    } else{
        searchMood = 'category';
        search.placeholder = 'Seach by Category';
    }

    search.focus();
    search.value = '';
    updateSystem();
})

document.getElementById('search').addEventListener('keyup', function(e){
    const value = e.target.value;
    console.log(value);

    let html;

    if(searchMood == 'title'){

        for(let i = 0; i < Items.length; i++){
            if(Items[i].title.includes(value.toLowerCase())){
                console.log(i)
                html += `
                    <tr class="single-item">
                        <td>${i+1}</td>
                        <td>${Items[i].title}</td>
                        <td>${Items[i].price}</td>
                        <td>${Items[i].taxes}</td>
                        <td>${Items[i].ads}</td>
                        <td>${Items[i].discount}</td>
                        <td>${Items[i].total}</td>
                        <td>${Items[i].category}</td>
                        <td><button id="update" data-index="${i}">Update</button></td>
                        <td><button id="delete" data-index="${i}">Delete</button></td>
                    </tr>`
            }
        }


    }else{
        
        for(let i = 0; i < Items.length; i++){
            if(Items[i].category.includes(value.toLowerCase())){
                console.log(i)
                html += `
                    <tr class="single-item">
                        <td>${i+1}</td>
                        <td>${Items[i].title}</td>
                        <td>${Items[i].price}</td>
                        <td>${Items[i].taxes}</td>
                        <td>${Items[i].ads}</td>
                        <td>${Items[i].discount}</td>
                        <td>${Items[i].total}</td>
                        <td>${Items[i].category}</td>
                        <td><button id="update" data-index="${i}">Update</button></td>
                        <td><button id="delete" data-index="${i}">Delete</button></td>
                    </tr>`
            }
        }


    }

    document.querySelector('.tbody').innerHTML = html;

})


//! clean data