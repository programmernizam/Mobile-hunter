const searchBtn = () =>{
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data));
}
const displayPhone = phones =>{
    console.log(phones)
    const displayResult = document.getElementById('display-result');
    phones.forEach(phone => {
        const newDiv = document.createElement('div');
        newDiv.className = 'col'
        newDiv.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h6>Brand: ${phone.brand}</h6>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary text-white rounded-pill px-4">Phone Details</button>
                </div>
            </div>
        `
        displayResult.appendChild(newDiv)
    });
}
const phoneDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetails(data))
}
phoneDetails()
const showPhoneDetails = phoneId=>{
    console.log(phoneId)
    const displayDetails = document.getElementById('details-result')
    const creatDiv = document.createElement('div')
}