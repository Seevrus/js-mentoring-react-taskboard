import { useState } from "react"
import classNames from 'classnames'
import { selectAllUsers } from "./usersSlice"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../users/usersSlice"
import { setCurrentUser } from "../filters/filtersSlice"

export const LoginPage = () => {
  const dispatch = useDispatch()

  const allUsers = useSelector(selectAllUsers)
  const [userEmail, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [valueError, setValueError] = useState(false)

  const onUserNameChanged = e => {setUserName(e.target.value)}
  const onPasswordChanged = e => {setPassword(e.target.value)}

  const canSubmit = userEmail && password
  const submitButtonClass = classNames({
    'muted-button': !canSubmit
  })

  const onSubmitButtonClicked = e => {
    const user = allUsers.find(user => user.email === userEmail)
    if (!user) {
      setValueError(true)
    }
    else if (user.password !== password) {
      setValueError(true)
    }
    else {
      setValueError(false)
      dispatch(login(user.id))
      dispatch(setCurrentUser(user.id))
    }
  }

  const inputClass = classNames({
    'has-error': valueError
  })

  return (
    <div className="small-container" style={{ maxWidth: "400px" }}>
      <form>
        <label htmlFor="name">Email</label>
        <input 
          type="text" 
          id="name" 
          className={inputClass}
          placeholder="example@address.com" 
          value={userEmail} 
          onChange={onUserNameChanged} />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password"
          className={inputClass}
          value={password}
          onChange={onPasswordChanged} />
        <button 
          type="button" 
          className={submitButtonClass} 
          onClick={onSubmitButtonClicked}
          disabled={!canSubmit}>Login</button>
      </form>
      {valueError ? <span style={{ color: "red" }}>Incorrect email or password!</span> : null}
    </div>
  )
}
