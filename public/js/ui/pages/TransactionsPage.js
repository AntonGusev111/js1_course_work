/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element){
      throw new Error('element is null')
    } else {
      this.element = element;
      this.registerEvents();
    }

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    
    this.render({"account_id":User.current().id})
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const dellAcc = document.querySelector('.remove-account');
    const dellTrans = document.querySelector('.content');
    dellAcc.addEventListener('click', (e)=>{
      this.removeAccount()
    })
    dellTrans.addEventListener('click', (e) =>{
      if (e.target.closest('button')){
        this.removeTransaction(e.target.dataset.id)
      }
      
    })

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
   // if (this.lastOption){
      if(confirm('Delete?') || this.lastOption){
        Account.remove({id:this.lastOption.account_id}, (response) => {
          if(response.success == true){
            App.updateWidgets();
            App.updateForms();
          };
        });
        this.clear();
      }
    //}
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if(confirm('Вы действительно хотите удалить эту транзакцию?')){
      Transaction.remove({id:id}, (response)=>{
        if(response.success == true){
          App.update();
        };
      })
    }

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (options){
      this.lastOption = options;
      Account.get(options.account_id, (response)=>{
        if(response.success == true){
          this.renderTitle(response.data.name)
        }
        
        Transaction.list(options, (response)=>{
          if(response.success == true){
            this.renderTransactions(response.data);
          };
        })
      })   
    }

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    App.update();
    this.renderTransactions([]);
    this.renderTitle('Название счета');
    this.lastOption = null;

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = document.querySelector('.content-title');
    title.innerText=name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)  
   * в формат «10 марта 2019 г. в 03:20»
   * */   
  formatDate(date){
    const Data = new Date(date)
    return `${Data.getDay()} ${Data.toLocaleString('ru', { month: 'long' })} ${Data.getFullYear()} г. в ${Data.getHours()}:${Data.getHours()}:${Data.getHours()}`
    
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
      let html = `<div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
  </div>`
    return html;
  }


  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const transactions = document.querySelector('.content');
    let htmlList = [];
    for (let item of data){

      htmlList.push(this.getTransactionHTML(item))
    }
    transactions.innerHTML = htmlList
  }
}