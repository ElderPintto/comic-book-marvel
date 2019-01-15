import $ from "jquery";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import comics  from "./comics";

class Favorite {
    constructor(){
        this.favoritesList = []
        this.init()
    }

    addList(item,id){
        let _self = this;
        this.favoritesList.push(id)
        this.isFavorite(item);
        
        this.updateListStorage();
        Swal({
            position: 'top-end',
            type: 'success',
            title: 'item added to your list of favorites',
            showConfirmButton: false,
            timer: 1500
        })
        
    }

    renderStatusFavorited(){
        let _self = this;

        //shelf
        this.favoritesList.forEach(function(item){
            $('.comicbook__list .comicbook__item').each(function(){
               let $element = this
               
                if($($element).attr('data-id') == item){
                    _self.isFavorite($element)
                }
            })
        })

        if($('body').hasClass('detail')){
            //datail
            this.favoritesList.forEach(function(item){
                let $element = $('.js-content-favorite');
                if($($element).attr('data-id') == item){
                    _self.isFavorite($element)
                }
    
            })
        }



    }
    
    removeList(item,id){
        var index = this.favoritesList.indexOf(id);
        
        if (index > -1) {
            this.favoritesList.splice(index, 1);
            item.removeClass('isFavorite')
            $(item).find('.fa').removeClass('fa-star')
            $(item).find('.fa').addClass('fa-star-o')
        }
        
        this.updateListStorage()
    }

    getComicId() {
        var id = localStorage.getItem('idComic')
        this.renderproduct(id)
    }


    coverString(str){
        let x  = str.toString();
        return x
    }
    
    rederFavoriiteColection(){
        let _self = this;
        if($('body').hasClass('favorite')){
            let ids = localStorage.getItem('listFavorite')
            let list = JSON.parse(ids);
            comics.map(function(item,index) { 
                if (list.includes(_self.coverString(item.id))){
                    
                    let b = `
                    <li class="comicbook__item js-content-favorite col-12 col-sm-6 col-md-4 col-lg-3" data-id="${item.id}">
                        <a href="/detail.html" class="comicbook__link">
                            <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="img" class="comicbook__img">
                            <span class="comicbook__title">${item.title}</span>
                            <span class="comicbook__date"></span>
                        </a>
                        <i class="fa fa-close comicbook__favorite  js-close-favorite"></i>
                    </li>
                    
                    `
            
                    $('.comicbook__list').append(b)
                }

                return
                
            })
            
        }
    }
    
    isFavorite(item) {
        $(item).addClass('isFavorite')
        $(item).find('.fa').addClass('fa-star')
        $(item).find('.fa').removeClass('fa-star-o')
    }
    
    getListStorage() {
        let items = localStorage.getItem("listFavorite");
        if(items){
            this.favoritesList  = JSON.parse(items);
        }
        
    }

    updateListStorage() {
        let itemsFavorited = JSON.stringify(this.favoritesList);
        localStorage.setItem("listFavorite", itemsFavorited);
    }

    bindEvents(){
        let _self = this;
        $('body').on('click', '.js-favorite', function(e) {
            e.preventDefault();
            var $this = this
            var item = $($this).closest('.js-content-favorite');
            var id = $($this).closest('.js-content-favorite').attr('data-id')

            
            if(!_self.favoritesList.includes(id)){
                _self.addList(item,id)
            }else {
                _self.removeList(item,id)
            }

        })


        $('body').on('click', '.js-close-favorite', function(e) {
            e.preventDefault();
            var $this = this
            var item = $($this).closest('.js-content-favorite');
            var id = $($this).closest('.js-content-favorite').attr('data-id')

            item.remove();
            
            _self.removeList(item,id)

        })



       
    }


    init() {
        this.getListStorage();
        this.rederFavoriiteColection();
        this.renderStatusFavorited();
        this.bindEvents()
    }
}

new Favorite()