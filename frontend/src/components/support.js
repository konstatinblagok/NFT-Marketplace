import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const headers = {
    'Content-Type': 'application/json'
 };

export default class support extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name:'',
            email:'',
            subject:'',
            comments :'',
            loading:0,
            nameError:'',
            emailError:'',
            subjectError:'',
            commentsError:''
        }
        this.contactAdd = this.contactAdd.bind(this)
        this.onChange = this.onChange.bind(this)
      
    }

    componentDidMount() {
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    onChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
         })
     }


     validate = () => {
        let nameError = "" 
        let emailError = '';
        let subjectError = '';
        let commentsError = '';

        if(this.state.name === ''){
           nameError = "Name is required"
        }
        if(this.state.email === ''){
           emailError = "Email is required"
        }
        if(this.state.subject === ''){
            subjectError = "Subject is required"
         }
         if(this.state.comments === ''){
            commentsError = "Comments is required"
         }
         
       
        if(nameError || emailError || subjectError || commentsError ){
           this.setState({
              nameError,emailError,subjectError,commentsError
           })
           return false
        }
        return true
     }
     

       //=======================================  contact us  =====================

   async contactAdd(e) {
       e.preventDefault()
       const isValid = this.validate()
       if(!isValid){
       }
       else{
        await axios({
            method: 'post',
            url: `${config.apiUrl}insertContact`,
            data: {"name":this.state.name,"email":this.state.email,"subject":this.state.subject,"comments":this.state.comments}
         })
            .then(result => {
               if (result.data.success === true) {
                   toast.success(result.data.msg, {
                       position: toast.POSITION.TOP_CENTER , 
                       })
                  this.setState({
                     name:'',
                     email:'',
                     subject:'',
                     comments:'',
                     loading:0,
                     nameError:'',
                     emailError:'',
                     subjectError:'',
                     commentsError:''
                  })
               }
               else if (result.data.success === false) {
               }
            }).catch(err => {
            });
       }
   
   }

    render() {
        return (    

            <>
            <Header/>
            <div id="content-block">
       <br/><br/>
         
         <div className="container-fluid custom-container">
          <ToastContainer/>
            <div className="container-fluid custom-container upcomming-drops" id="upcomming-drops">
               <div className="container">
               <div class="row">
   <div class="col-sm-2 col-md-2 col-lg-2 "></div>
   <div class="col-sm-8 col-md-8 col-lg-8 ">
   <div className="col-md-12">
                       <h3><strong>Contact us</strong></h3>
                        <hr/>
      <p style={{color:"#fff"}}>In case you face any difficulty or inconvenience within the Infinity8 platform, kindly fill in the form below, and we shall contact you shortly.</p>
     <br/>
      <form onSubmit={this.contactAdd}>
         <div class="row">
            <div class="col-md-6 col-lg-6">
               <div class="form-group"><label for="" style={{color:"#fff"}}>Name</label>
               <input type="text" class="form-control input-lg" style={{marginTop:'10px',marginBottom:'10px'}} placeholder="Name" onChange={this.onChange}
               value={this.state.name} name="name"/>
                  <span className="error-asterick" > {this.state.nameError}</span>
               </div>
            </div>
            <div class="col-md-6 col-lg-6">
               <div class="form-group"><label for="" style={{color:"#fff"}}>Email Address</label>
               <input type="email" class="form-control input-lg" style={{marginTop:'10px',marginBottom:'10px'}} placeholder="Email Address" 
               onChange={this.onChange}
               value={this.state.email} name="email"/>

                  <span className="error-asterick" > {this.state.emailError}</span>
               </div>
            </div>
            <div class="col-md-12 col-lg-12">
               <div class="form-group"><label for="" style={{color:"#fff"}}>Subject</label>
               <input type="text" class="form-control input-lg" style={{marginTop:'10px',marginBottom:'10px'}} placeholder="Subject" 
               onChange={this.onChange}
               value={this.state.subject}
               name="subject"/>
  
                  <span className="error-asterick" > {this.state.subjectError}</span>
               </div>
            </div>
            <div class="col-md-12 col-lg-12">
               <div class="form-group"><label for="" style={{color:"#fff"}}>Comments</label>
               <textarea name="comments" id="comments"
               onChange={this.onChange}
               value={this.state.comments}
                class="form-control input-lg" style={{marginTop:'10px',marginBottom:'10px'}} rows="5" 
                cols="50" placeholder="Type here ..."></textarea>
                   <span className="error-asterick" > {this.state.commentsError}</span>
                </div>
            </div>
            <div class="col-md-12 col-lg-12">
              <div class="clr formBottom">
                  <div class="formText float-left" style={{color:"#fff",marginBottom:'15px'}}>* All the field are necessary to fill in.</div>
               <br/>
               </div>
               {this.state.loading === 0 ? 
               <button type="submit" class="btn-primary btn size-1 col-sm-12 btn-lg"><span> Submit </span></button>
               :
               <button type="submit" disabled class="btn-primary btn size-1 col-sm-12 btn-lg"><span> Loading... </span></button>
               
            }
            </div>
         </div>
      </form>
      </div>

   </div>
   <div class="col-sm-2 col-md-2 col-lg-2 "></div>
</div>
               </div>
            </div>
            <br/>
         </div>
      </div>



             <Footer/>
            </>

        )
    }
}