import React from 'react';
import { connect } from 'react-redux';
import { postUser, deleteUser, clearError } from './store';

class UserForm extends React.Component{
  constructor(props){
    super()
    this.state = {
      name: props.user.name || "",
      rating: props.user.rating || 0,
      id: props.user.id || null,
      error: props.error || {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.error !== this.state.error){
      this.setState({
        error: nextProps.error
      })
    } 
    if(nextProps.user.name !== this.state.name){
      this.setState({
        name: nextProps.user.name || "",
        rating: nextProps.user.rating || 0,
        id: nextProps.user.id || null,
      })
      
    }
  }
  handleChange(ev){
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(Object.assign({}, this.state, change))
  }
  
  onClear(){
    this.props.handleClear()
  }

  onSubmit(ev){
    this.props.handleSubmit(this.state)
  }
  onDelete(ev){
    this.props.handleDelete(this.state.id)
  }
  
  render(){
    const { user } = this.props
    const { name, rating, error } = this.state
    const { handleChange, onSubmit, onDelete, onClear} = this
    return(
      <div>
        <h3>{ user.name ?  user.name  : "Create User"} </h3> 
        { error.type ? 
          <div className="alert alert-danger"> 
            { error.message } 
          <button type="button" className="close" onClick={onClear}>
            <span aria-hidden="true">&times;</span>
          </button>
          </div> : 
          null }
        <div className="form-inline">  
          <div className="form-group mb-2"> 
            <input className="form-control" value={ name } onChange={ handleChange } placeholder="Enter a User Name" name="name"/>
            <input className="form-control" value={ rating } onChange={ handleChange } name="rating" type="number" />
            <button className="btn btn-success" onClick={ onSubmit } disabled={!name.length || error.type }> {user.id ? 'Update ' : 'Create ' } User</button>
            { user.id ? <button onClick={onDelete} className="btn btn-danger">DELETE</button> : null }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { history }) =>{
  return{
    handleSubmit: (user)=> dispatch(postUser(user, history)),
    handleDelete: (id)=> dispatch(deleteUser(id, history)),
    handleClear: () => dispatch(clearError())
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    id: id || null,
    user: state.users.find(user => user.id === id) || "",
    error: state.error || {}
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);