/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if (!this.element){
      throw new Error('element is null or undefined');
    } 
    this.registerEvents();
    this.update();
  }


  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const crAccountBtn = document.querySelector('.accounts-panel');
    crAccountBtn.addEventListener('click', (e)=>{
      if (e.target.className == 'create-account label label-success'){
        App.getModal('createAccount').open();
      } else {
        this.onSelectAccount(e.target);
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям 
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if(User.current()){
      Account.list(User.current().id, (response) => {
        this.clear();
        for (let item of response.data){
          this.renderItem(item);
        } ;
      });
    }
    
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accList = document.querySelectorAll('.account')
    if(accList){
      for (let acc of accList){
       acc.remove();
      }
    }
    
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    if(element.closest('li').className == 'account'){
      for (let acc of document.querySelectorAll('.account')){
        acc.className = 'account';
      }
      element.closest('li').className = 'active account';
      App.showPage( 'transactions', { account_id: element.closest('li').dataset.id });
    }

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const htmlString = `<li class="account" data-id="${item.id}">
      <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
      </a>
    </li>`;
    return htmlString

  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
   this.element.insertAdjacentHTML("beforeend", this.getAccountHTML(data));
  }
}
