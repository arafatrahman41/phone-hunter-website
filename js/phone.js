const loadPhone = async (searchText='12', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new card
  phoneContainer.textContent = "";

  //display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // console.log("is show All", isShowAll);
  // display only first 12 phones if not show all
  if (!isShowAll) {
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
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary px-6">Show Details</button>
            </div>
        </div>
        `;
    // 4. appendChild
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpinner(false);
};

//
const handleShowDetail = async (id) => {
//   console.log(id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    
    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.classList = 'space-y-3'
    showDetailsContainer.innerHTML = `
      <img src="${phone.image}" alt=""> 
       <p><span>Strong:</span>${phone?.mainFeatures?.storage}</p>
       <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
    ` 
    // <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available'}</p>

    // show the modal 
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
