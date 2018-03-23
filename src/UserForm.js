import React from 'react';
import { connect } from 'react-redux';
import { postUser, deleteUser } from './store';

class UserForm extends React.Component{
  constructor(props){
    super()
    this.state = {
      name: props.user.name || "",
      rating: props.user.rating || 0,
      id: props.user.id
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.name !== this.state.name){
      this.setState({
        name: nextProps.user.name,
        rating: nextProps.user.rating,
        id: nextProps.user.id
      })
    }
  }
  handleChange(ev){
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(Object.assign({}, this.state, change))
  }

  onSubmit(ev){
    this.props.handleSubmit(this.state)
  }
  onDelete(ev){
    this.props.handleDelete(this.state.id, this.props.history)
  }
  
  render(){
    const { user } = this.props
    const { name, rating } = this.state
    const { handleChange, onSubmit, onDelete} = this
    return(
      <div>
        <h3> {user.name} </h3>
        <input value={name} onChange={handleChange} name="name"/>
        <input value={rating} onChange={handleChange} name="rating" type="number" />
        <button onClick={onSubmit}> {user.id ? 'Update ' : 'Create ' } User</button>
        {user.id ? <button onClick={onDelete}>DELETE</button> : null}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    handleSubmit: (user)=>dispatch(postUser(user)),
    handleDelete: (id, history)=>dispatch(deleteUser(id, history))
  }
}

const mapStateToProps = ({ users }, ownProps) => {
  return {
    history: ownProps.history,
    id: ownProps.id || "",
    user: users.find(user => user.id === ownProps.id) || ""
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);