import React, {Component} from 'react';
import "./loginform.scss";

export class loginform extends Component {

  

  render() {
    return (
      <div {...this.props} className={[this.props.className, "loginform-style"].join(' ')}>
        {this.props.children}
       <form>
            <div class="formcontainer">
                <h1>Login</h1>
                <p>Enter the Following Information to Login</p>
                <hr></hr>

                <label for="email"><b>Email</b></label>
                <input type = "text" placeholder="Enter Email" name="email" required ></input>
                <label for="password"><b>Password</b></label>
                <input type = "password" placeholder="Enter Password" name="password" required ></input>
                
               
                <hr></hr>
                <button type="submit" class="loginbutton">Login</button>
                
                
            </div>

       </form>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: loginform,
  gridOptions: {h: 18, w: 5, minW: 5, minH: 18},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Login Form",
  desc: "A Basic Login Form",
  iconPathName: require('../../../assets/icons/other/047-table.svg'),
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "",
    }
  }
};