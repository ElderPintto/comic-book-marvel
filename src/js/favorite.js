import $ from "jquery";
import Swal from 'sweetalert2/dist/sweetalert2.js'

class Favorite {
    constructor(){
        this.favoritesList = []
        this.init()
    }

    addList(item,id){
        let _self = this;
        this.favoritesList.push(id)
        this.isFavorite(item);
        this.readList();
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
        this.favoritesList.forEach(function(item){
            console.log(item)
            $('.commicbook__list .commicbook__item').each(function(){
               let $element = this
               
                if($($element).attr('data-id') == item){
                    _self.isFavorite($element)
                }
            })
        })
    }
    
    removeList(item,id){
        var index = this.favoritesList.indexOf(id);
        
        if (index > -1) {
            this.favoritesList.splice(index, 1);
            item.removeClass('isFavorite')
            $(item).find('.fa').removeClass('fa-star-o')
        }
        this.readList();
        this.updateListStorage()
    }
    
    readList(){
        console.log('favorited', this.favoritesList);
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
        this.readList();
    }

    updateListStorage() {
        let itemsFavorited = JSON.stringify(this.favoritesList);
        localStorage.setItem("listFavorite", itemsFavorited);
    }

    bindEvents(){
        let _self = this;
        $('body').on('click', '.commicbook__favorite', function(e) {
            e.preventDefault();
            var $this = this
            var item = $($this).closest('.commicbook__item');
            var id = $($this).closest('.commicbook__item').attr('data-id')

            console.log('data',id)
            console.log('item',item)
            
            if(!_self.favoritesList.includes(id)){
                _self.addList(item,id)
            }else {
                _self.removeList(item,id)
            }

        })
    }

    init() {
        this.getListStorage();
        this.renderStatusFavorited();
        this.bindEvents()
    }
}

new Favorite()