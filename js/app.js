// Spinner
const spinner = style =>{
    document.getElementById('spinner').style.display = style
}
// Search Filed
const searchBtn = () =>{
    document.getElementById('display-result').textContent = ''
    document.getElementById('display-details').textContent = ''
    const searchFiled = document.getElementById('search-filed')
    const searchResult = searchFiled.value
    spinner('block')
    searchFiled.value = ''
    const error = document.getElementById('error')
    if(searchResult == ''){
        error.innerText = 'enter a phones name first'
        error.className = 'text-danger'
        spinner('none')
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`
            fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data.data.length <= 0){
                    error.innerText = `${data.data.length} search result found '${searchResult}'`
                    error.className = 'text-danger'
                    spinner('none')
                }
                else{
                    error.innerText = `${data.data.length} result found '${searchResult}'`
                    error.className = 'text-success'
                    displaySearch(data.data)
                    spinner('none')
                }
            })
    }
}
// Display Search Results
const displaySearch = phones =>{
    console.log(phones)
    const phonesCount = phones.slice(0, 20)
    const displayResult = document.getElementById('display-result')
    phonesCount.forEach(phone => {
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `
            <div class="card shadow h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
               <div class="card-body">
                   <h5 class="card-title">${phone.phone_name}</h5>
                   <h6 class="card-title">Brand: ${phone.brand}</h6>
                   <button onclick="phoneDetails('${phone.slug}')" class="text-white btn   btn-primary rounded-pill px-5">Details</button>
                </div>
            </div>
        `
        displayResult.appendChild(div)
        spinner('none')
    });
}
// Phone Details API 
const phoneDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}
// Display Details
const displayDetails = phoneId =>{
    const phoneDetailsShow = document.getElementById('display-details')
    phoneDetailsShow.textContent = ''
    const div = document.createElement('div')
    div.className = 'col'
    div.innerHTML = `
    <div class="card h-100">
        <div class="row g-0  align-items-center">
            <div class="col-md-4">
                <img src="${phoneId.image}" class="card-img-top" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h4 class="card-title">Phone: ${phoneId.name}</h4>
                <h5>Brand: ${phoneId.brand}</h5>    
                <h5>${phoneId.releaseDate ? phoneId.releaseDate:'No release date found'}</h5>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">${phoneId.name}' Full Specifications</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Chip: ${phoneId.mainFeatures.chipSet}</th>
                    </tr>
                    <tr>
                        <th scope="row">Display: ${phoneId.mainFeatures.displaySize}</th>
                    </tr>
                    <tr>
                        <th scope="row">Memory: ${phoneId.mainFeatures.memory}</th>
                    </tr>
                    <tr>
                        <th scope="row">Storage: ${phoneId.mainFeatures.storage}</th>
                    </tr>
                    <tr>
                        <th scope="row">Bluetooth: ${phoneId.others ? phoneId.others.Bluetooth:'No'}</th>
                    </tr>
                    <tr>
                        <th scope="row">GPS: ${phoneId.others ? phoneId.others.GPS:'No'}</th>
                    </tr>
                    <tr>
                        <th scope="row">NFC: ${phoneId.others ? phoneId.others.NFC:'No'}</th>
                    </tr>
                    <tr>
                        <th scope="row">Radio: ${phoneId.others ? phoneId.others.Radio:'No'}</th>
                    </tr>
                    <tr>
                        <th scope="row">USB: ${phoneId.others ? phoneId.others.USB:'No'}</th>
                    </tr>
                    <tr>
                        <th scope="row">WLAN: ${phoneId.others? phoneId.others.WLAN:'No'}</th>
                    </tr>
                    <tr>
                        <th scope="row">Sensor: ${phoneId.mainFeatures.sensors[0] ? phoneId.mainFeatures.sensors[0]:''},${phoneId.mainFeatures.sensors[1] ? phoneId.mainFeatures.sensors[1]:''}, ${phoneId.mainFeatures.sensors[2] ? phoneId.mainFeatures.sensors[2]:''}, ${phoneId.mainFeatures.sensors[3] ? phoneId.mainFeatures.sensors[3]:''}, ${phoneId.mainFeatures.sensors[4] ? phoneId.mainFeatures.sensors[4]:''}, ${phoneId.mainFeatures.sensors[5] ? phoneId.mainFeatures.sensors[5]:''}</th>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
      </div>
    `
    phoneDetailsShow.appendChild(div)
}