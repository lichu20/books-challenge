window.addEventListener('load', function(){
    let form = document.querySelector('.card')

    form.addEventListener('submit', function(event){
        event.preventDefault();

        let errors = [];

        let name = document.querySelector('#name')
        if(name.value == ''){
            errors.push('No puede dejar el nombre vacío')
        }

        let email = document.querySelector('#email')
        if(email.value == ''){
            errors.push('El email debe ser válido')
        }

        let country = document.querySelector('#country')
        if(country.value == ''){
            errors.push('No puede dejar el campo de país vacío')
        }

        let password = document.querySelector('#password')
        if(password.value == '' ){
            errors.push('No puede dejar la contraseña vacía')
        }
        else if(password.value < 7 ){
            errors.push('La contraseña debe tener más de 7 caracteres')
        }

        let categoryUser = document.querySelector('#user')
        let categoryAdmin = document.querySelector('#admin')
        if(!(categoryAdmin.checked || categoryUser.checked)){
            errors.push('Debes elegir una de las opciones de categoría')
        }
        
        if(errors.length > 0){
            let ulErrors = document.querySelector(".errores")
            ulErrors.innerHTML = ""
            event.preventDefault();
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += '<li>' + errors[i] + '</li>'
                
            }
        }else{
            form.submit()
        }
    })
})