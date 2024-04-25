const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new card
  phoneContainer.textContent ='';

  //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }

    console.log("is show All", isShowAll);
    // display only first 12 phones if not show all
   if(!isShowAll){
    phones = phones.slice(0, 12);
   }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 shadow-md`;
    //3. set innerHTML
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Phones" /></figure>
        <div class="card-body">
            <h2 class="card-title mx-auto">${phone.phone_name}</h2>
            <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions justify-center">
                <button class="btn btn-primary px-6">Show Details</button>
            </div>
        </div>
        `;
    // 4. appendChild
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();
