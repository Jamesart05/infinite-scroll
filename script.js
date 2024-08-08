const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = 0

// Unsplash API
const count = 30
const apiKey = 'gAL_6h6dMYc1a0pRe0kndEfBSBq0_MN5_puyML1iawg'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all images were loaded
function imgLoaded(){
      imagesLoaded ++
      if(imagesLoaded === totalImages){
            ready = true
            loader.hidden = true

      }
}

// helper function to set attributes on DOM elements
function setAttribute(element,attributes){
      for(const key in attributes){
            element.setAttribute(key, attributes[key])
      }
}

// create elements for links and photos,add to DOM
function displayPhotos(){
      imagesLoaded = 0
      totalImages = photosArray.length
      // run function for each object in photoArrays
      photosArray.forEach((photo)=>{
            // create <a> to link to unsplash
            const item  = document.createElement('a')
            setAttribute(item,{
                  href: photo.links.html,
                  target:'_blank',
            })
            // create <img> for photo
            const img = document.createElement('img')
            setAttribute(img, {
                  src: photo.urls.regular,
                  alt: photo.alt_description,
                  title: photo.alt_description,
            })

            img.addEventListener('load', imgLoaded)

            // put <img> inside <a>,then put both inside imageContainer
            item.appendChild(img)
            imageContainer.appendChild(item)
      })
}

// Get photos from unsplash API
async function getPhotos(){
      try{
            const response = await fetch(apiUrl)
            photosArray = await response.json()
            displayPhotos()
      }catch(error){

      }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
      if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready){
            ready = false
            getPhotos()
      }
})

// 
getPhotos()


// IN PRODUCTION CODE WE DONT WANT TO HAVE CONSOLE LOGS EVERYWHERE SO ALWAYS REMEMBER TO CLEAN UP YA CODE.