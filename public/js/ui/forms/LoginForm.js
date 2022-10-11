/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    let window = document.querySelectorAll('.modal fade in')
    if (User.login(data)){
      App.setState( 'user-logged' );
      for(let i =0; i<window.length; i++){
        if(window.style.display == "block"){
          Modal.close()
        }
      }  

    }  
  }
}