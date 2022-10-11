/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sideBarButton = document.getElementsByClassName('sidebar-toggle visible-xs')
    sideBarButton[0].addEventListener('click', function(e){
      if(document.body.className === 'skin-blue sidebar-mini app'){
        document.body.className = 'skin-blue sidebar-mini app sidebar-open sidebar-collapse';
      } else{
        document.body.className = 'skin-blue sidebar-mini app';
      }
    });

    
  
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const login = document.querySelector('.menu-item_login');
    const reg =  document.querySelector('.menu-item_register');
    const logout = document.querySelector('.menu-item_logout');

    login.addEventListener('click',(e)=>{

      let windowObject = App.getModal('login');
      let modal = new Modal(windowObject.element);
      modal.open();
    });

    reg.addEventListener('click',(e)=>{

      let windowObject = App.getModal('register');
      let modal = new Modal(windowObject.element);
      modal.open();
    });

    logout.addEventListener('click',(e)=>{
      if(User.logout()){
        let windowObject = App.getModal('init');
       let modal = new Modal(windowObject.element);
        modal.open();
      }
    });

  }
}
