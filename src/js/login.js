import $ from "jquery";
// http://www.mocky.io/v2/5c39120f3100005d00a992bf



  class login {
    constructor() {
      this.localSpeople = [];
      this.init();
      //this.autoLogin();
    }
    
    getUsers(username,password) {
      fetch("http://www.mocky.io/v2/5c39120f3100005d00a992bf")
      .then(response => response.json()) // retorna uma promise
      .then(result => {
        console.log('getUsers',result)

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
          console.log(element.username + " is logged in!!!");

          _self.localSpeople.push({
            username: element.username,
            password: element.password
          });

          _self.SetUserStorege(_self.localSpeople);
          _self.redirectCatalog();
        } else {
          console.log("incorrect username or password");
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
      window.location.replace("http://localhost:9000");
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

        console.log(valName)
        console.log(valPass)

        _self.getUsers(valName, valPass);
      });

      $('.form').on('click', '#logout', _self.logout)

      $(document).ready(function() {

        if(localStorage.getItem("logged") != 'true'){
          localStorage.setItem("logged", "false");
        }

      });
    }

    init() {
      this.bindEvents();
    }
  }

  new login();
