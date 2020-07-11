import React, {Component} from 'react'
import {MDBLink} from "mdbreact";

class Menu extends Component{
    render() {
        switch (this.props.role) {
            case "Admin":
                return  (
                    <>
                        <MDBLink to="/commissionlist" className="">Просмотр работников</MDBLink>
                        <MDBLink to="/delcommission" className="">Удалить работника</MDBLink>
                        <MDBLink to="/addcommission" className="">Добавить работника</MDBLink>
                        <MDBLink to="/editcommission" className="">Редактировать работника</MDBLink>
                        <hr/>
                        <MDBLink to="/logout" className="">Выход</MDBLink>
                    </>
                )
            case "Commission":
                return  (
                    <>
                        <MDBLink to="/conscriptlist" className="">Просмотр призывников</MDBLink>
                        <MDBLink to="/delconscript" className="">Удалить призывника</MDBLink>
                        <MDBLink to="/addconscript" className="">Добавить призывника</MDBLink>
                        <MDBLink to="/editconscript" className="">Редактировать призывника</MDBLink>
                        <MDBLink to="/search" className="">Поиск призывников</MDBLink>
                        <hr/>
                        <MDBLink to="/logout" className="">Выход</MDBLink>
                    </>
                )
            default:
                return null
        }
    }
}

export default Menu