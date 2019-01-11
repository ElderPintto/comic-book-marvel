import $ from "jquery";
// http://www.mocky.io/v2/5c39120f3100005d00a992bf

class login {
  constructor() {

    this.users = [];
    this.localSpeople = [];
    this.binding();
    this.init();
  }
  
  getUsers() {
    fetch("http://www.mocky.io/v2/5c39120f3100005d00a992bf")
    .then(response => response.json()) // retorna uma promise
    .then(result => {
      this.users.push(result)
    })
    .catch(err => {
    // trata se alguma das promises falhar
    console.error('Failed retrieving information', err);
  });
  }

  validadeUser(username, password) {
    var _self = this;
    this.users[0].forEach(function(element) {
      console.log(element.username)
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
    localStorage.setItem("logged", userStorage);
  }

  redirectCatalog(){
    window.location.replace("http://localhost:9000/catalog.html");
  }

  binding() {
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

      _self.validadeUser(valName, valPass);
    });
  }

  init() {
    this.getUsers()
  }
}

new login();