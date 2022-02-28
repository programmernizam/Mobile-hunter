const spanner = style =>{
    document.getElementById('spanner').style.display = style
}
const searchBtn = () =>{
    document.getElementById('display-result').textContent = ''
    document.getElementById('display-details').textContent = ''
    const searchFiled = document.getElementById('search-filed')
    const searchResult = searchFiled.value
    spanner('block')
    searchFiled.value = ''
    const error = document.getElementById('error')
    if(searchResult == ''){
        error.innerText = 'Enter a phones name'
        error.className = 'text-danger'
        spanner('none')
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`
            fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data.data.length <= 0){
                    error.innerText = `${data.data.length} search result found '${searchResult}'`
                    error.className = 'text-danger'
                    spanner('none')
                }
                else{
                    error.innerText = `${data.data.length} result found '${searchResult}'`
                    error.className = 'text-success'
                    displaySearch(data.data)
                    spanner('none')
                }
            })
    }
}
const displaySearch = phones =>{
    console.log(phones)
    const displayResult = document.getElementById('display-result')
    phones.forEach(phone => {
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `
        <div class="card shadow h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <h6 class="card-title">Brand: ${phone.brand}</h6>
          <button onclick="displayDetails('${phone.slug}')" class="text-white btn btn-primary rounded-pill px-5">Details</button>
        </div>
      </div>
        `
        displayResult.appendChild(div)
        spanner('none')
    });
}
const displayDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayInfo(data.data))
}
displayDetails()
const displayInfo = phoneId =>{
    console.log(phoneId)
    const displayInfo = document.getElementById('display-details')
    displayInfo.textContent = ''
    const div = document.createElement('div')
    div.className = 'col'
    div.innerHTML = `
    <div class="card h-100">
        <img src="${phoneId.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">Phone name: ${phoneId.name}</h4>
          <h6>Brand: ${phoneId.brand}</h6>
        </div>
      </div>
    `
    displayInfo.appendChild(div)
}