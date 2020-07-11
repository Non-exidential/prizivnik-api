import React, {Component} from 'react'
import Layout from "./Layout";
import {MDBBtn, MDBInput} from "mdbreact";
import fetch from 'isomorphic-unfetch'
import DatePicker from "react-datepicker";

class EditConscript extends Component{
    constructor(props) {
        super(props);

        this.state = {
            birth: new Date().getFullYear(),
            year_of_call: new Date().getFullYear()
        };
    }

    handleChangeBirth = date => {
        this.setState({
            birth: date
        });
    };

    handleChangeYearOfCall = date => {
        this.setState({
            year_of_call: date
        });
    };

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state)
        fetch('http://prizivnik.std-280.ist.mospolytech.ru/conscript', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then( async(res) => {
            let result = await res.json()
            if(result.message === "UPDATED"){
                alert("Призывник обновлен")
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
                                <h3 className="text-center">Редактировать призывника</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                    <MDBInput label="ID призывника" name="id" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Фамилия" name="secondName" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Имя" name="firstName" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Отчество" name="lastName" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Дата рождения" name="date" type="date" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput type="textarea" label="Место регистрации" name="registration" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput type="textarea" label="Учебное заведение" name="institution" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput type="textarea" label="Место работы" name="jobPlace" onChange={(e) => this.onChange(e)}/>

                                    <MDBInput label="Серия паспорта" type="number" name="series" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Номер паспорта" type="number" name="number" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Кем выдан" type="textarea" name="issued" onChange={(e) => this.onChange(e)}/>

                                    <MDBInput label="Номер части" type="number" name="part_number" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Род войск" name="type_of_army" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="Год призыва" name="year_of_call" type="number" onChange={(e) => this.onChange(e)}/>
                                    <MDBInput label="ID работника" name="worker_id" type="number" onChange={(e) => this.onChange(e)}/>

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

export default EditConscript