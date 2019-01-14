import $ from "jquery";
import Swal from 'sweetalert2/dist/sweetalert2.js'
// http://www.mocky.io/v2/5c3b3d5a2e0000590064887a



  class login {
    constructor() {
      this.localSpeople = [];
      this.init();

    }
    
    getUsers(username,password) {
      fetch("http://www.mocky.io/v2/5c3b3d5a2e0000590064887a")
      .then(response => response.json()) // retorna uma promise
      .then(result => {
        this.validadeUser(result, username, password)
      })
      .catch(err => {
      // trata se alguma das promises falhar
      console.error('Failed retrieving information', err);
    });
    }

    validadeUser(users, username, password) {
      var _self = this;

      users.forEach(function(element) {

        if (username == element.username && password == element.password) {
          _self.localSpeople.push({
            username: element.username,
            password: element.password
          });

          _self.SetUserStorege(_self.localSpeople);
          _self.redirectCatalog();

        } else {

          Swal({
            title: 'incorrect username or password',
            text: 'Do you want to continue',
            type: 'error',
          })
        }
      });
    }

    SetUserStorege(user) {
      let userStorage = JSON.stringify(user);
      localStorage.setItem("loggedUser", userStorage);
      localStorage.setItem("logged", "true");
    }

    redirectCatalog(){
      window.location.replace("http://localhost:9000/catalog.html");
    }

    autoLogin() {

      let _self = this;
      let logged = localStorage.getItem("logged");
      
      let user = localStorage.getItem("loggedUser");
      let loggedUser = JSON.parse(user);

      if(logged == "true") {
        
        if(user){
          this.getUsers(loggedUser[0].username, loggedUser[0].password)
        }
      }
    

    }

    logout() {
      localStorage.setItem("logged", "false");
      localStorage.removeItem("loggedUser");
      window.location.replace("./");
    }

    bindEvents() {
      let _self = this;
      let $username = $("#username");
      let $password = $("#password");
      let $btnSend = $("#send");

      $(".form").submit("#send", function(e) {
        e.preventDefault();
        let valName = $username.val();
        let valPass = $password.val();

        _self.getUsers(valName, valPass);
      });

      $('.form').on('click', '#logout', _self.logout);

      $(document).ready(function() {

        if(localStorage.getItem("logged") != 'true'){
          localStorage.setItem("logged", "false");
        }

      });
    }

    init() {
      this.bindEvents();
      
      if($('body').hasClass('home')){
        this.autoLogin();
      }
    }
  }

  new login();
