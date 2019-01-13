import $ from "jquery";
import CryptoJS from "crypto-js";

class BooksMarvel {
  constructor() {
    var books = [];
    this.init();
  }

  getbooks() {
    var PRIV_KEY = "c6421b1592ee214e13e7e024c2a9bf3fc794a29e";
    var PUBLIC_KEY = "b2bfb8fe90813539f191d562708d3783";

    // you need a new ts every request
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

    // the api deals a lot in ids rather than just the strings you want to use
    var characterId = "1009718"; // wolverine

    var url = "http://gateway.marvel.com:80/v1/public/comics";

    console.log(url);
    $.getJSON(url, {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash,
      characters: characterId
    })
      .done(function(data) {
        // sort of a long dump you will need to sort through
        console.log(data);
      })
      .fail(function(err) {
        // the error codes are listed on the dev site
        console.log(err);
      });
  }
  
  redirectId(id) {
    localStorage.setItem('idComic', id)
    window.location.replace("http://localhost:9000/detail.html");
  }

  getComicId() {
    var id = localStorage.getItem('idComic')

    $('.js-content-favorite').attr('data-id', id)
  }

  render() {
    //this.getbooks();
  }

  bindEvents() {
    let _self = this
    $('body').on('click', '.comicbook__item' , function(e){
      e.preventDefault();
      var $this = this
      var id = $($this).attr('data-id')
      _self.redirectId(id)
    })
  }

  init() {
    //this.render();
    this.bindEvents();

    if($('body').hasClass('detail')){
      this.getComicId();
    }
  }
}

new BooksMarvel();
