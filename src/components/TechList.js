import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
    state = {
        newTech: '',
        techs: [],
    };

    componentDidMount() {
        const techs = localStorage.getItem('techs');

        if (techs) {
            this.setState({ techs: JSON.parse(techs) });
        }
    };

    componentDidUpdate(_, prevState) {
        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs));
        }
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        return;
    };

    handleDelete = (indexCurrent) => {
        this.setState({ 
            techs: this.state.techs.filter((tech, index) => index !== indexCurrent) 
        });
        return;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        /**
         * Funciona
         */
        /*
        const techs = this.state.techs;
        techs.push(this.state.newTech);

        this.setState({ techs, newTech: '' });
        */

        /**
         * Mais bonito e organizado
         */

        this.setState({ techs: [...this.state.techs, this.state.newTech], newTech: '' });
        return;
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="newTech" onChange={this.handleInputChange} value={this.state.newTech} />{" "}
                    <button type="submit">Enviar</button>
                </form>
                <ul>
                    {this.state.techs.map((tech, index) => (
                        <TechItem key={index} index={index} tech={tech} onDelete={() => this.handleDelete(index)} />
                    ))}
                </ul>
            </>
        );
    };
};

export default TechList;
