import $ from "jquery";
import CryptoJS from "crypto-js";
import comics  from "./comics";
import characters from "./characters";

class BooksMarvel {
  constructor() {
    var books = [];
    this.init();
  }

  // getbooks() {
  //   var PRIV_KEY = "c6421b1592ee214e13e7e024c2a9bf3fc794a29e";
  //   var PUBLIC_KEY = "b2bfb8fe90813539f191d562708d3783";

  //   // you need a new ts every request
  //   var ts = new Date().getTime();
  //   var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

  //   // the api deals a lot in ids rather than just the strings you want to use
  //   var characterId = "1009718"; // wolverine

  //   var url = "http://gateway.marvel.com:80/v1/public/comics";

  //   console.log(url);
  //   $.getJSON(url, {
  //     ts: ts,
  //     apikey: PUBLIC_KEY,
  //     hash: hash,
  //     characters: characterId
  //   })
  //     .done(function(data) {
  //       // sort of a long dump you will need to sort through
  //       console.log(data);
  //     })
  //     .fail(function(err) {
  //       // the error codes are listed on the dev site
  //       console.log(err);
  //     });
  // }

  getBooks() {
  }
  
  redirectId(id) {
  
    localStorage.setItem('idComic', id)
    window.location.href = "/detail.html";
  }

  getComicId() {
    var id = localStorage.getItem('idComic')

    this.renderproduct(id)
  }

  renderCatalog() {
  
    comics.forEach(function(item,index) {
        let b = `
        <li class="comicbook__item js-content-favorite col-12 col-sm-6 col-md-4 col-lg-3" data-id="${item.id}">
            <a href="/detail.html" class="comicbook__link">
                <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="img" class="comicbook__img">
                <span class="comicbook__title">${item.title}</span>
                <span class="comicbook__date"></span>
            </a>
            <i class="fa fa-star-o comicbook__favorite  js-favorite"></i>
        </li>
        
        `

        $('.comicbook__list').append(b)
    })
  }

  renderproduct(id) {
    console.log(characters)
    let book = comics.filter(function(item,index) {
 

      if(item.id == id){
        console.log('book', item)
        var b = `
        <div class="detail__infoArea detail__infoArea--img js-content-favorite col col-12 col-md-6" data-id="${item.id}">
        <i class="fa fa-star-o detail__favorite comicbook__favorite js-favorite"></i>
        <figure>
            <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.thumbnail.path}">
        </figure>
    </div>
    <div class="detail__infoArea--description col col-12 col-md-6">
       <h1 class="detail__titleSection titleSection col col-12">
          ${item.title}
        </h1>   
        <div class="detail__description">
            <p class="detail__text detail__date">January 09, 2019</p>
            <p class="detail__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur? Incidunt optio nostrum consectetur quaerat rem minus adipisci quis! Ipsam quas dolorem asperiores consequuntur? Voluptates tempora quod temporibus error architecto.
            </p>
        </div>
            <h3 class="detail__title">
                Characters
            </h3>
            <ul class="characters">
              ${characters.map((character, i) => `
              
                <li class="characters__item">
                    <figure class="characters__img"><img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.thumbnail.path}"></figure>
                    <p class="characters__name">${character.name}</p>
                </li>
              `.trim()).join('')}
            </ul>
    </div>
        
        `
      }

      $('.detail__info .row').append(b)
    })

    
  }

  bindEvents() {
    let _self = this
    $('body').on('click', '.comicbook__link' , function(e){
      e.preventDefault();
      var $this = this
      var id = $($this).closest('.comicbook__item').attr('data-id')

      _self.redirectId(id)
    })
  }

  init() {
    this.bindEvents();
    this.renderCatalog();

    if($('body').hasClass('detail')){
      this.getComicId();
    }
  }
}

new BooksMarvel();
