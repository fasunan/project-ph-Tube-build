// add category
const loadCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  const categoryContainer = document.getElementById("category-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <button onclick="showContent(${category.category_id})",  id="btn"  class="btn btn-outline hover:bg-red-500 ">${category.category}</button>
          `;
    categoryContainer.appendChild(div);
  });
};

// sort by views

const shortByViewsButton = document.getElementById("short-by-views");
shortByViewsButton.addEventListener("click", async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  data = await response.json();
  const sortData = data.data.sort(
    (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
  );

  updateContentContainer(sortData);
});

// show content

const showContent = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  data = await response.json();
  updateContentContainer(data.data);
};

// update container

function updateContentContainer(sortedData) {
  const contentContainer = document.getElementById("content-container");
  contentContainer.innerHTML = "";

  if (sortedData.length === 0) {
    contentContainer.innerHTML = `<figure><img class=" w-32 h-32" src="Icon.png" <span class=" font-bold text-5xl"> Opss! Sorry No Data Available </span></figure>`;
  } else {
    sortedData.forEach((content) => {
      const div = document.createElement("div");
      //   time convert
      const hours = Math.floor(content.others.posted_date / 3600);
      const minutes = Math.floor((content.others.posted_date % 3600) / 60);
      let a;
      if (hours != 0) {
        a = `<p class=" bg-stone-800 rounded-md bg-auto text-white">${hours} hours ${minutes} minutes ago</p>`;
      } else {
        a = "";
      }

      div.innerHTML = `
          <div class="card card-compact w-72  max-h-72 bg-base-100 shadow-xl">
              <figure><img class="" src=${content.thumbnail} /></figure>
            <div class="text-end -mt-6"><span class=" bg-stone-800 rounded-md w-20 bg-auto text-white">${a}</span></div>
              
              <div class="card-body">
  
                <div class="avatar">
                  <div class="w-12 rounded-full -ml-6">
                  <img src=${content.authors[0].profile_picture}/>
                </div>
                  <h2 class="card-title ml-4">${content.title} </h2>
                  </div>
                  <div class="flex">
                  <span> ${content.authors[0].profile_name}</span>
                
                  ${content.authors[0].verified ? svgBlueTik : ""}
  
              </div>
                <p class="">${content.others.views} Views</p>
              </div>
            </div>
          `;

      contentContainer.appendChild(div);
    });
  }
}

// loaded data
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  data = await response.json();
  loadCategory();
  updateContentContainer(data.data);
  console.log(data.data);
});

// blue tick
const svgBlueTik = ` <svg width="20" height="20" -ml-1  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="fi_10629607" clip-path="url(#clip0_11_215)">
  <g id="Group">
  <path id="Vector" d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
  <path id="Vector_2" d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
  </g>
  </g>
  <defs>
  <clipPath id="clip0_11_215">
  <rect width="20" height="20" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  `;

// blog field
document.getElementById("btn-blog").addEventListener("click", function () {
  window.open("blogindex.html", "_blank");
});
