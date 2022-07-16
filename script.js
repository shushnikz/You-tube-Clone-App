const videoCard=document.querySelector('.videos')
let api_key="AIzaSyB7pl9PR4BlAp3y5ClaoeM5Y3yE3Dit-E8"
let video_http="https://www.googleapis.com/youtube/v3/videos?"
let channel="https://www.googleapis.com/youtube/v3/channels?"

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res=>res.json())
.then(data=>{
    // console.log(data)
    data.items.forEach(item=>{
        getChannelIcon(item)
    })
})
.catch(err=>console.log(err))

const getChannelIcon=(video_data)=>{
  fetch(channel+new URLSearchParams({
    key:api_key,
    part:'snippet',
    id:video_data.snippet.channelId
  }))
  .then(res=>res.json())
  .then(data=>{
  video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url
  console.log(video_data)
   makeVideoPage(video_data)
  })
}

const makeVideoPage=(data)=>{
    videoCard.innerHTML += `
    
    <div class="display-videos" onclick="location.href='https://youtube.com/watch?v=${data.id}'">
              <img src="${data.snippet.thumbnails.high.url}" class="alter" alt="">
            <div class="video-content">
               <img src="${data.channelThumbnail}" class="channel-icon" alt="">
               <div class="info">
                   <h4 class="title">${data.snippet.title}</h4>
                   <p class="channel-name">${data.snippet.channelTitle}</p>
               </div>
            </div>
    </div>
    
    
    `
}

const searchItem=document.querySelector('.search-bar')
const searchButton=document.querySelector('.search-btn')
let searchLink="https://www.youtube.com/results?search_query="
searchButton.addEventListener('click',()=>{
    if(searchItem.value.length){
        location.href=searchLink + searchItem.value
    }
})

