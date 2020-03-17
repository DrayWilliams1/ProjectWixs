// Dependencies
import axios from "axios"; // for AJAX call to PHP files
import qs from "qs"; // for packaging details collected from the form

const AUTH_USER_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/authUser.php";
const CHECK_IS_ADMIN = 
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/isAdmin.php";

/**
 * Purpose: A file for checking whether the system user is currently logged and able to access authenticated routes.
 */
class Auth {
  constructor() {
    this.authenticated = false;
    this.admin = false;
  }

  /**
   * Allows for the creation of a cookie
   *
   * @param {*} name the name of the cookie to be created
   * @param {*} value the value for which the cookie will contain
   * @param {*} days the number of days until the cookie expires
   */
  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log("Cookie created");
  }

  /**
   * Allows for the retrieval of a cookie based on name
   *
   * @param {*} name
   */
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * Allows for the deletion of a cookie
   *
   * @param {*} name the name of the cookie to be deleted
   */
  eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999; path=/;";
  }

  // TODO: check the database to ensure the username and session id match that which was submitted to during the login/registration
  isAuthenticated() {
    var currentUser = this.getCookie("user");
    var currentSession = this.getCookie("usid");
    //var authenticated = false;

    if (currentUser && currentSession) {
      // if cookie values exist
      /*const params = {
        email: currentUser,
        usid: currentSession
      };

      axios
        .post(AUTH_USER_URL, qs.stringify(params))
        .then(response => {
          console.log(response);

          if (response.data["success"] === true) {
            // user is authenticated

            //return (this.authenticated = true);
            authenticated = true;
          } else {
            // user not authenticated
            //return (this.authenticated = false);
            authenticated = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // cookie values empty
      authenticated = false;
    }
    return authenticated;*/
      return true;
    } else {
      return false;
    }
  }
  isAdmin(){
    if(this.isAuthenticated){//only procede if the user is authenticated 
      //TO DO: axios calls to check if the logged in user is an admin
      //if(user is admin)
      return (this.admin = true);
      //else return(this.admin = false);
    }
  }
}
export default new Auth();
