window.addEventListener('load', function(){
    let form = document.querySelector('.card')

    form.addEventListener('submit', function(event){
        event.preventDefault();

        let errors = [];

        let email = document.querySelector('#email')
        if(email.value == ''){
            errors.push('El email debe ser válido')
        }

        let password = document.querySelector('#password')
        if(password.value == '' ){
            errors.push('No puede dejar la contraseña vacío')
        }
        else if(password.value > 7 ){
            errors.push('La contraseña debe tener más de 7 caracteres')
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