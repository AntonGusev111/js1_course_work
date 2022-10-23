/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let url = options.url;
    formData = new FormData();
    if (options.method == 'GET'){
        url = url+'?';
        for (let item in options.data){
            url = url+`${item}=${options.data[item]}&` 
        }
    } else {
        for (let item in options.data){
            formData.append(item,options.data[item])
        }  
        
    }
    xhr.open(options.method,url)
    xhr.send(formData);

    xhr.responseType = 'json';
    xhr.onload = function () {
       if(options.current){
        options.current(xhr.response.user)
       };
        options.callback(xhr.response);
            
      };
      xhr.onerror = (e) => {
        console.log('error', e);
      };

};
