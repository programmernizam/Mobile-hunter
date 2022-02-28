const searchBtn = () =>{
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data));
}
const displayPhone = phone =>{
    console.log(phone)
}