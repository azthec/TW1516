function check()
{
    if(document.getElementById("uname").checkValidity() && document.getElementById("psw").checkValidity())
    {
        activateLogin();
        toggleDiv("login");
        toggleDiv("GameArea");
        beginMultiplayer(document.getElementById('uname').value, document.getElementById('psw').value)
    }else
    {
        //do nothing
    }
}





















/*

js

var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


html


<form class="pure-form">
                <fieldset>
                    <legend>Confirm password with HTML5</legend>

                    <input type="password" placeholder="Password" id="password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required>
                    <input type="password" placeholder="Confirm Password" id="confirm_password" required>

                    <button type="submit" class="pure-button pure-button-primary">Confirm</button>
                </fieldset>
            </form>

*/