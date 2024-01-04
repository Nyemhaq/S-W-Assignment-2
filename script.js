let unclickBtn = null;

const loadButton = (id,btn) => {
    if (unclickBtn != null)
        unclickBtn.style.backgroundColor='';
    
    btn.style.backgroundColor = 'orangered';
    unclickBtn = btn;

    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        .then((data) => displayData(data));
            
};

const displayData = (data) => {
    console.log(data);

    const videoContainer = document.getElementById("videoContainer");

    videoContainer.innerHTML=" ";
    
    if (data.data.length==0)
    {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="drawing">
            <img class="oops" src="PHero-Tube/Icon.png" alt="">
            <h3>Oops!! Sorry, There is no content here</h3>
        </div>
        `
        videoContainer.appendChild(card);
    }
    data.data.forEach((video) => {
        const card = document.createElement("div")
        card.classList.add("cards")
        
        const verify = video.authors[0].verified? `<img class="vrfy" src="PHero-Tube/vrfy.jpg" alt="Verified">`: '';

        const post = video.others.posted_date;
        const hour = parseInt(post / 3600);
        const min = parseInt ((post % 3600) / 60);
        const date = video.others.posted_date? `<h6>${hour} hours ${min} minutes ago</h6>`:'';

        card.innerHTML = `
        <div class="date-img">
            <img class="video-thm" src=${video.thumbnail} alt="">
            ${date}
        </div>
        <div class="titleimg">
        <img class="authorimg" src=${video.authors[0].profile_picture} alt="">
            <div class="videoTitle">
                <h4>${video.title}</h4>
                <div class="author">
                    <h5>${video.authors[0].profile_name}</h5>
                    ${verify}
                </div>
                <h5>${video.others.views}</h5>
            </div>
        </div>
        `
        videoContainer.appendChild(card);
    })
};

const loadButton2 = (id,btn) => {
    if (unclickBtn != null)
        unclickBtn.style.backgroundColor='';
    
    btn.style.backgroundColor = 'orangered';
    unclickBtn = btn;

    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        .then((data) => sortbyview(data))         
};

let arr = [], arr2 = [];

const sortbyview = (data) => {
   arr = data.data.map((video) => parseInt(video.others.views))
   arr2=[...arr]

   console.log(arr2);
   arr2.sort((a,b) => b-a)

   console.log(arr2);

   const videoContainer = document.getElementById("videoContainer");

   videoContainer.innerHTML=" ";

    arr2.forEach((totalview) => {
    const video = data.data.find((video) => parseInt(video.others.views) == totalview);
        
        const verify = video.authors[0].verified? `<img class="vrfy" src="PHero-Tube/vrfy.jpg" alt="Verified">`: '';

        const post = video.others.posted_date;
        const hour = parseInt(post / 3600);
        const min = parseInt ((post % 3600) / 60);
        console.log(hour,min);
        const date = video.others.posted_date? `<h6>${hour} hours ${min} minutes ago</h6>`:'';

        const card = document.createElement("div");
        card.classList.add("cards");

        card.innerHTML = `
        <div class="date-img">
            <img class="video-thm" src=${video.thumbnail} alt="">
            ${date}
        </div>
        <div class="titleimg">
        <img class="authorimg" src=${video.authors[0].profile_picture} alt="">
            <div class="videoTitle">
                <h4>${video.title}</h4>
                <div class="author">
                    <h5>${video.authors[0].profile_name}</h5>
                    ${verify}
                </div>
                <h5>${video.others.views}</h5>
            </div>
        </div>
        `
        videoContainer.appendChild(card);

        video.others.views = null;
    })
};




