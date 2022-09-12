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
    const menu = document.getElementsByClassName('sidebar-menu');
    let windowName = '';
    
    for (let item = 0; item < menu.length; item++){
      menu[item].addEventListener('click', (e) =>{
        if(e.target.parentElement.className =='menu-item menu-item_login' || e.target.parentElement.parentElement.className =='menu-item menu-item_login'){
          windowName = 'login'
        }
        if(e.target.parentElement.className =='menu-item menu-item_register' || e.target.parentElement.parentElement.className =='menu-item menu-item_register'){
          windowName = 'register'
        }
        if(e.target.parentElement.className =='menu-item menu-item_logout' || e.target.parentElement.parentElement.className =='menu-item menu-item_logout'){
          if(User.logout()){
            App.setState('init')
          }
        }
        if (windowName != ''){
          let windowObject = App.getModal(windowName);
          let modal = new Modal(windowObject.element.style);
          modal.open();
        }
      })
    }
  }
}