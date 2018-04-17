/*************************** small & handy helper functions *************************/
function validatePassword(password) {
    /* custom valiator */
    /**
     * var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var mediumRegex = new RegExp("^( ((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,} )");
                                             
    ^	        The password string will start this way
    (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
    (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
    (?=.*[0-9])	The string must contain at least 1 numeric character
    (?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    (?=.{8,})	The string must be eight characters or longer
        
    */
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,18})");
    //                           >=1 lower  >=1 upper     >=1 dight    >=1 special         length 6 ~ 18
    return (strongRegex.test(password));
}

function validateEmail(email) {
    /* custom valiator */
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}

function arrayContains(array, element) {
    if (array == undefined || array == "" || array == null) return false;

    for (var i = 0; i < array.length; i++) {
        console.log("matcheding: " + array[i] + " | " + element)
        if (array[i] == element) {
            console.log("YES")
            return true;
        }
    }
    return false;
}




module.exports = {
    "validatePassword": validatePassword
    , "validateEmail": validateEmail
    , "arrayContains": arrayContains
}