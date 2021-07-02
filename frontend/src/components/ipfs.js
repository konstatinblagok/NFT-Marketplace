import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ReactDatatable from '@ashvin27/react-datatable'

const headers = {
    'Content-Type': 'application/json'
 };

export default class ipfs extends Component {

    constructor(props) {
        super(props)
        const { match: { params } } = this.props;
        this.ipfs = params.ipfs       
        }
    

    componentDidMount() {
      }
    

    render() {
        return (    

            <>
                <img src={"https://ipfs.io/ipfs/"+this.ipfs}/>
             </>
             )
             }
             }
