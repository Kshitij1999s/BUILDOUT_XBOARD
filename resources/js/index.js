 const generateID = () =>Math.random().toString(36).substr(2,9);
//  <button class="btn btn-link" aria-expanded="${currentIndex===0 ? 'true':'false'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}"  aria-controls="collapse${id}">
//       ${title}
//       </button>

{/* <div id = "collapse${id}" class="collapse ${currentIndex===0 ? 'show':''}"
      data-parent="#accordionId" aria-labelledby="heading${id}">
      </div> */}

 const CreateAccordionItem =(title,id,currentIndex)=>
 {
    return `
    <div class="accordion" id="${id}"> 
    <div class="accordion-item" id="card${id}">
    <h2 class="accordion-header" id="heading${id}">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
    ${title}
  </button>
      </h2>
      
      <div id="collapse${id}" class="accordion-collapse collapse  ${currentIndex===0 ? 'show':''}" aria-labelledby="heading${id}" data-bs-parent="#${id}">
    </div>
      </div>
      </div>

    `;
 };

 const createCarouselItem =(item,active) =>{
    return `
    <div class="carousel-item ${active ? "active" :""}">
    <div class="card d-block">
      <img class ="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}"  alt="Card imagecap">
    <div class="card-body">
      <h5 class="card-title">${item["title"]}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
      <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
      <p class="card-text">${item["description"]}</p>
      <a href="${item["link"]}" class="stretched-link" target = "_blank"></a>

      </div>
      </div>
      </div>
    `;
 };

 const createCarouselOuter = (id,innerId) =>{
    return `
    <div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="${innerId}">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    `;
 };
 
 const init = async()=>{
     //itetate over magazines array
     for(let i=0;i<magazines.length;i++){
        let url = magazines[i];

        //fetch data for URL
        let response= await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`
            
        );
        let data = await response.json();
       
        //Create Accordinan Item 
         let accordionId = generateID();           
         console.log("here",data["feed"]["title"],accordionId,i)
         let accordion = CreateAccordionItem(data["feed"]["title"],accordionId,i);
         document.getElementById("accordionItemContainer").innerHTML +=accordion;

        //  Create Carousel
         let carouselId = generateID();
         let carouselInnerId = generateID();

         let carousel = createCarouselOuter(carouselId,carouselInnerId);
         document.getElementById(`collapse${accordionId}`).innerHTML=carousel;

         //create Carousel item and push it to Carousel Inner
            let items = data["items"];
            // for(j in items){
            //     let carouselItem = createCarouselItem(items[j],j==0);
            //     document.getElementById(`${carouselInnerId}`).innerHTML +=carouselItem;
            // }

            items.forEach((item,index)=>{
              let carouselItem = createCarouselItem(item, index ===0);
              document.getElementById(`${carouselInnerId}`).innerHTML +=carouselItem;
            })

     }
 }

 init();
