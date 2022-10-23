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
    const accListEncom = document.getElementById('income-accounts-list')
    const accListExp = document.getElementById('expense-accounts-list')
    if (User.current()){
    Account.list(User.current().id, (response) => {
      for (let item of response['data']){
        accListEncom.insertAdjacentHTML("beforeend", `<option value="${item.id}">${item.name}</option>`);
        accListExp.insertAdjacentHTML("beforeend", `<option value="${item.id}">${item.name}</option>`);
      }
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