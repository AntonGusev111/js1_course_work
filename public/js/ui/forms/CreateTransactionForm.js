/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accList = document.getElementById(this.element.children[3].children[1].id)
    if (User.current()){
    Account.list(User.current().id, (response) => {
        accList.innerHTML = response.data.reduce((acc,  item) => {
         return acc + (`<option value="${item.id}">${item.name}</option>`);
        }, 0);

    })
    }
  }

  /** 
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (response) => {
      if (response.success == true){
        this.element.reset();
        if(this.element.id == 'new-income-form'){
          
          App.getModal('newIncome').close();
        } else {
          App.getModal('newExpense').close();
        }
        App.update();
      }
    })
  }
}



