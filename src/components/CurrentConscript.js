import React, {Component} from "react";
import Layout from "./Layout";
import fetch from "isomorphic-unfetch";
import {DateConverter} from "../functions/date";

class CurrentConscript extends Component{
    constructor(props) {
        super(props);

        this.state = {
            conscript: []
        }
    }

    componentWillMount() {
        fetch('http://prizivnik.std-280.ist.mospolytech.ru/conscriptbyid', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({id: this.props.match.params.id})
        }).then( async(res) => {
            let result = await res.json()
            this.setState({conscript: result.list})
        })
    }


    render() {
        console.log(this.state)
        return (
            <Layout>
                <section>
                    <div className="container">
                        {this.state.conscript && this.state.conscript.length > 0
                            ? <div className="row">
                                <div className="col-12">
                                    <h4>Призывник</h4>
                                    <p>ID - {this.state.conscript[0].conscript_id}</p>
                                    <p>Фамилия - {this.state.conscript[0].secondName}</p>
                                    <p>Имя - {this.state.conscript[0].firstName}</p>
                                    <p>Отчество - {this.state.conscript[0].lastName}</p>
                                    <p>Дата рождения - {DateConverter(this.state.conscript[0].birth)}</p>
                                    <p>Место регистрации - {this.state.conscript[0].registration}</p>
                                    <p>Учебное заведение - {this.state.conscript[0].institution}</p>
                                    <p>Место работы - {this.state.conscript[0].jobPlace}</p>
                                </div>
                                <hr/>
                                <div className="col-12">
                                    <h4>Паспорт</h4>
                                    <p>Серия - {this.state.conscript[0].series}</p>
                                    <p>Номер - {this.state.conscript[0].number}</p>
                                    <p>Кем выдан - {this.state.conscript[0].issued}</p>
                                </div>
                                <hr/>
                                <div className="col-12">
                                    <h4>Призыв</h4>
                                    <p>Номер части - {this.state.conscript[0].part_number}</p>
                                    <p>Род войск - {this.state.conscript[0].type_of_army}</p>
                                    <p>Год призыва - {this.state.conscript[0].year_of_call}</p>
                                </div>
                            </div>
                            : <div className="row">
                                <div className="col-12">
                                    <h5 className="text-center">Загрузка</h5>
                                </div>
                            </div>
                        }

                    </div>
                </section>
            </Layout>
        );
    }
}

export default CurrentConscript