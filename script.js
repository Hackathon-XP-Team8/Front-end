const login = {
    email: '',
    senha: '',
    acesso: ''
  }
  
  function test(){
      console.log("olá mundo")
      window.location.replace("./wallet.html");
  }
  
  function RedirecionarCadastro() {
    window.location.replace("./cadastrar.html");
  }
  
  function onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      var id_token = ''
      if(profile.getId() !== ''){
          console.log("ID: " + profile.getId()); // Don't send this directly to your server!
          console.log('Full Name: ' + profile.getName());
          console.log('Given Name: ' + profile.getGivenName());
          console.log('Family Name: ' + profile.getFamilyName());
          console.log("Image URL: " + profile.getImageUrl());
          console.log("Email: " + profile.getEmail());
          localStorage.setItem("Full Name",  profile.getName());
          localStorage.setItem("ID",  profile.getId());
          localStorage.setItem("Given Name",  profile.getGivenName());
          localStorage.setItem("Family Name",  profile.getFamilyName());
          localStorage.setItem("Image URL",  profile.getImageUrl());
          localStorage.setItem("Email",  profile.getEmail());
          // The ID token you need to pass to your backend:
          id_token= googleUser.getAuthResponse().id_token;
          console.log("ID Token: " + id_token);
          window.location.replace("./dashboard.html");
      }
  }
   
  function setAcesso(tipo) {
    if(tipo === 'prof'){
      document.getElementById('acesso-prof').classList.add('acesso_select')
      login.acesso = 'Professor'
      document.getElementById('acesso-pais').classList.remove('acesso_select')
    } else{
      document.getElementById('acesso-pais').classList.add('acesso_select')
      login.acesso = 'Pais'
      document.getElementById('acesso-prof').classList.remove('acesso_select')
    }
  }
  
  function loginDB() {
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    login.email = document.getElementById('email').value
    console.log(login.email)
    console.log(login.senha)
    login.senha = document.getElementById('password').value
    if(login.senha !== "" && login.email !== "" && login.acesso !== ""){
      console.log(login)
      var rows;
      db.transaction(function(tx) {
        tx.executeSql(`SELECT * FROM CADASTRO WHERE email='${login.email}' AND senha='${login.senha}' AND acesso='${login.acesso}'`, [], function(sqlTransaction, sqlResultSet) {
          rows = sqlResultSet.rows;
          console.log(rows[0])
          if(rows.length > 0){
            localStorage.setItem("Full Name",  rows[0].nome);
            localStorage.setItem("Email",  rows[0].nome);
            window.location.replace("./dashboard.html")
          }
        });
      })
      console.log('SELECT * FROM CADASTRO WHERE email="' + login.email + '" AND senha="' + login.senha + '" AND acesso="' +  login.acesso +  '"')
    }
  }