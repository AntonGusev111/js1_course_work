/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    if (options.method == 'GET'){
        xhr.open(options.method, `${options.url}?mail=${options.data.email}&password=${options.data.password}`);
        xhr.send();
    } else {
        formData = new FormData;
        formData.append( 'mail', options.data.email );
        formData.append( 'password', options.data.password );
        console.log(formData)
        xhr.open(options.method,options.url)
        xhr.send(formData);
    }

    xhr.responseType = 'json';
    xhr.onprogress = function () {
        if (xhr.status=='200'){
            options.callback(xhr)
        };
      };

};
