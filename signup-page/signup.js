let username = document.getElementById('username');
let password = document.getElementById('password');
let userArray = [];
let test = "matariya";
let test2 = "Matariya";
if (test === test2.toLowerCase()) {
    console.log("same");
}else{
    console.log("not same");
}

const toSubmit = () => {
    let user = {
        id: Date.now(),
        username:username.value,
        password:password.value
    } 
    userArray = JSON.parse(localStorage.getItem('userData'));
    
    let findIndex = userArray.findIndex((e)=>{
        console.log(username.value.toLowerCase());
            return e.username.toLowerCase() === username.value.toLowerCase() || e.password === password.value;
    })

      if (findIndex == -1) {
       userArray.push(user);
        localStorage.setItem('userData' , JSON.stringify(userArray));
        alert("User created successfully");
        window.location.href = '../login-page/login.html';
       }

    if (findIndex >= 0) {
        username.value= '';
        password.value= '';
        alert("user is already exsisted, please go to the login page")
    }

}