import React,{ Component } from 'react'

class Form extends Component{
    constructor(props){
        super(props)
        this.state = { player1:'',player2:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        const { player1, player2 } = this.state
        event.preventDefault()

        if (!!player1  && !!player2 ) {
            if( player1.toLowerCase() === player2.toLowerCase()) {
                alert('The players must have different names !');
            } else {
                sessionStorage.setItem('player1', player1);
                sessionStorage.setItem('player2', player2);
                localStorage.setItem('isGameOn', true);
                window.location.reload();
            }
        } else {
            alert('Please chose names !')
        }

    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className={'div-form'}>
                <div>
                    <label htmlFor='player1'>[X] Chose Player1 name: </label>
                    <input
                        name='player1'
                        value = {this.state.player1}
                        className={'input-text'}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='player3'>[O] Chose Player2 name:</label>
                    <input
                        name='player2'
                        value={this.state.player2}
                        className={'input-text'}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <button className={'button-start'}>Start New Game</button>
                </div>
            </form>
        )
    }
}

export default Form
