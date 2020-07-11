import React, { Component } from 'react';
import './App.css';
import {MDBBtn, MDBInput} from "mdbreact";
import fetch from 'isomorphic-unfetch'
import {Redirect} from "react-router-dom";

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            auth: localStorage.getItem("User"),
            login: "",
            password: "",
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        this.auth()
    }

    auth(){
        this.setState({auth: localStorage.getItem("User")})
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state)
        let login = this.state.login,
            password = this.state.password

        fetch('http://prizivnik.std-280.ist.mospolytech.ru/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        }).then( async (res) => {
            let result = await res.json()
            console.log(result)
            switch (result.message) {
                case "COMMISSION":
                    localStorage.setItem("User", "Commission")
                    this.auth()
                    break;
                case "ADMIN":
                    localStorage.setItem("User", "Admin")
                    this.auth()
                    break;
                case "USER NOT FOUND":
                    alert("Пользователь не найден!");
                    break;
                default:
                    alert("Ошибка сервера!")
                    return
            }
        })
    }

    render() {
        if(!this.state.auth) {
            return (
                <section className="fullwidthsection d-flex align-items-center justify-content-center">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <form onSubmit={(e) => this.onSubmit(e)}>
                                <p className="h5 text-center mb-4">ИС "Учет призывников"</p>
                                <div className="grey-text">
                                    <MDBInput label="Логин" icon="user" group type="text" validate error="wrong" name="login"
                                              success="right" onChange={(e) => {this.onChange(e)}}/>
                                    <MDBInput label="Пароль" icon="lock" group type="password" name="password" validate onChange={(e) => {this.onChange(e)}}/>
                                </div>
                                <div className="text-center">
                                    <MDBBtn type="submit">Войти</MDBBtn>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            );
        } else {
            return <Redirect to="/nav" />
        }
    }
}

export default App;
