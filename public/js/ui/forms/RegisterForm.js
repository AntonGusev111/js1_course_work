/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    let window = document.querySelectorAll('.modal fade in')
    if (User.register(data)){
      App.setState('user-logged');
      for(let i =0; i<window.length; i++){
        if(window.style.display == "block"){
          Modal.close()
        }
      }
    }
  }
}