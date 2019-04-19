import React, { Component } from "react";
import List from '@material-ui/core/List';
import { withRouter } from 'react-router-dom'; 
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { checkCodePost, changePost } from '../Utility/RecoverageFunction'
// import {
//     UncontrolledPopover, PopoverHeader, PopoverBody,
//   } from 'reactstrap'

let card ={
  width: '275px'
 };
 let container = {
  marginLeft: "45%"
 }
 var topSectionStyle = {
  marginTop:"10%",
};


class Accesscode extends Component {
    constructor(props) {
        super(props);
        console.log('this.props', this.props.location.state)
        this.state = {
            fields: {
                code: '',
                password: '',
                repassword: '',
            },
            error: {

            },
            password_error: [],
            passwordCheck: [{req:"≥ 8 characters", valid:false},
            {req:"At least 1 uppercase letter", valid:false},
            {req:"At least 1 lowercase letter", valid:false},
            {req:"At least 1 special character !@#$%^&*",valid:false}]
        };
        this.passwordChecker = this.passwordChecker.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => (event) => {
      // console.log("before update", this.state.fields.password)
      const name= event.target.name
      const value = event.target.value
      this.setState(prevState => ({
          fields: {
            ...prevState.fields,
            [name]: value
          }}),
          // () => console.log("after  update", this.state.fields.password)
          )
     }

    passwordChecker(){
        let pw = this.state.fields.password;
        let tmp_passwordCheck = this.state.passwordCheck
    
        // req:"≥ 8 characters"
        tmp_passwordCheck[0].valid = (pw.length >= 8) ? true : false
        
        // At least 1 Uppercase letter
        if( /(?=.*[A-Z])/.test(pw)){
          tmp_passwordCheck[1].valid = true
        }
        else{
          tmp_passwordCheck[1].valid = false
        }
    
        // At least 1 Lowercase letter
        if( /(?=.*[a-z])/.test(pw)){
          tmp_passwordCheck[2].valid = true
        }
        else{
          tmp_passwordCheck[2].valid = false
        }
    
        // At least 1 special character !@#$%^&*
        if( /(?=.*[!@#$%^&*])/.test(pw)){
          tmp_passwordCheck[3].valid = true
        }
        else{
          tmp_passwordCheck[3].valid = false
        }
    
        this.setState({ passwordCheck: tmp_passwordCheck});
      }

    checkCode = (e) => {
      e.preventDefault();
      const temp_fields = {
        access_code: this.state.fields.code,
        email: this.props.location.state,
      }
      console.log('email:',temp_fields.email)
      console.log('code:', temp_fields.access_code)
      checkCodePost(temp_fields).then(response =>{
        if (response === "S") {
            // const whatever = { ... this.state}
            // console.log('whatever1', whatever)
            alert("Code is valid, please set your new password!");
        }
        else {
            alert("Code is invalid or expired. Please go back to get a new code!");
            window.location.assign("/Recoverage")
        }
      })
    }

    reset = (event) => {
        // alert("Email sent!");
        event.preventDefault();
        const temp_fields = {
            email: this.props.location.state,
            password: this.state.fields.password,
            repassword: this.state.fields.repassword,
          }
          if(temp_fields.code === '' || temp_fields.password==='' || temp_fields.repassword==='')
          {
          this.setState({
            password_error: false,
            code_error: false,
            showNullError: true,
          })
        }
        // if (this.validate()) {
        //   const temp_fields = {
        //   code: this.state.fields.code,
        //   email: this.state.fields.email,
        //   password: this.state.fields.password,
        //   repassword: this.state.fields.repassword,

        //   }
        //   resetPost(temp_fields).then(response => {
        //     if(response === 200)
        //     {
        //       this.setState({accesscde_error : false})
        //     } else if (response === 400)
        //     {
        //       this.setState({accesscde_error : false})
        //     }
        //   })
        // }
        else{
        changePost(temp_fields).then(resopnse=>{
          alert("Reset password successfully! Please login again")
          window.location.assign("/")
          
        })}
        
    }


    render(){

        // const password_error = (
        //     <div className="text-warning">{this.state.password_error.map((each) => <div>{each}</div>
        //     )}</div>
        // )
    
        // const no_error = (
        //     <div className="text-warning"></div>
        // )
    
        // var password_requirements_component = this.state.passwordCheck.map(ele=>{
        //     return <div key={ele.req} className= { ele.valid ? "valid-req" : "invalid-req" }>{ele.req}</div>
        // }) 
    

        return(
          <div style={container}>
            <div className="topheader" style={topSectionStyle}>
              <Card style={card} >
                <CardContent>
                  <div className="col-auto pl-0">
                    <h3> Password Recoverage </h3>
                  </div>
                    <List component="nav">
                      <ListItem />
                        <TextField  
                          id="code"
                          label="code"
                          name="code"
                          value={this.state.fields.code}
                          onChange={this.handleChange()}
                          placeholder="Access code: 1234567"     
                        /> <button type="submit" color="primary" onClick={this.checkCode}>
                              Check Code
                          </button>
                        <ListItem />
                        <TextField
                          id="PopoverFocus"
                          type="password"
                          label="password"
                          name="password"
                          value={this.state.fields.password}
                          onChange={this.handleChange()}
                          placeholder="**********"
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$" 
                          required     
                        />
                        {/* <div className="text-warning">{this.state.errors.password}</div>
                        {this.state.password_error? password_error : no_error}
                        <UncontrolledPopover trigger="focus" placement="right" target="PopoverFocus">
                            <PopoverHeader>Password Requirements</PopoverHeader>
                            <PopoverBody>
                            {password_requirements_component}
                            </PopoverBody>
                        </UncontrolledPopover> */}
                        <ListItem />
                        <TextField
                          id="repassword"
                          label="repassword"
                          name="repassword"
                          type="password"
                          value={this.state.fields.repassword}
                          onChange={this.handleChange()}
                          placeholder="**********"     
                        />
                        <ListItem/>
                          <button type="submit" color="primary" onClick={this.reset}>
                              Reset Password
                          </button>
                      </List>
                        {/* {showNullError && (
                          <div>
                            <p>The code, password, repassword cannot be null.</p>
                          </div>
                        )}
                        {code_error && (
                          <div>
                            <p>The code is invalid. Please check again.</p>
                          </div>
                        )} */}
                  </CardContent>
                </Card>
            </div>
          </div>
        )

    }
}

export default withRouter(Accesscode);
