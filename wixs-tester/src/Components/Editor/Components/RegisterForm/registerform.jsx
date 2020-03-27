import React, {Component} from 'react';
import "./registerform.scss";

export class registerform extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "registerform-style"].join(' ')}>
        {this.props.children}
       <form>
            <div class="formcontainer">
                <h1>Register</h1>
                <p>Enter the Following Information to Create an Account</p>
                <hr></hr>

                <label for="email"><b>Email</b></label>
                <input type = "text" placeholder="Enter Email" name="email" required></input>
                <label for="password"><b>Password</b></label>
                <input type = "password" placeholder="Enter Password" name="password" required></input>
                <label for="passwordrepeat"><b>Enter Password Again</b></label>
                <input type = "password" placeholder="Enter Password Again" name="password" required></input>
                <hr></hr>
                <button type="submit" class="registerbutton">Register</button>
                
                
            </div>

       </form>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: registerform,
  gridOptions: {h: 21, w: 5, minW: 5, minH: 21},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Register Form",
  desc: "A Basic Register Form",
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "",
    }
  }
};