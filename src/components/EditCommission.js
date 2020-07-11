import React, {Component} from 'react'
import Layout from "./Layout";
import {MDBBtn, MDBInput} from "mdbreact";
import fetch from 'isomorphic-unfetch'

class EditCommission extends Component{

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        fetch('http://prizivnik.std-280.ist.mospolytech.ru/commission', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then( async(res) => {
            let result = await res.json()
            if(result.message === "UPDATED"){
                alert("Работник изменен")
            } else {
                alert("Ошибка")
            }
        })
    }

    render() {
        return (
            <Layout>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center">Редактировать работника</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                    <MDBInput label="ID работника" name="id" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Логин" name="login" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Пароль"  name="password" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Фамилия"  name="secondName" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Имя"  name="firstName" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Отчество"  name="lastName" onChange={(e) => this.onChange(e)}/>
                                    <MDBBtn type="submit">Редактировать</MDBBtn>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}

export default EditCommission