/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element){ 
      this.element = element;
      this.registerEvents();
    }

  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const transactPanel = document.querySelector('.transactions-panel');
    transactPanel.addEventListener('click', (e)=>{
      if(e.target.className == 'btn btn-success btn-block create-income-button'){
        App.getModal('newIncome').open();
      } else{
        App.getModal('newExpense').open();
      }
    })
  }
}
