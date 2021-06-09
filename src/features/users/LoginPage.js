import jwt from 'jsonwebtoken'
import { useState } from "react"
import classNames from 'classnames'
import { fetchUsers } from "./usersSlice"
import { useDispatch } from "react-redux"
import { login } from "../users/usersSlice"
import { setCurrentUser } from "../filters/filtersSlice"

export const LoginPage = () => {
  const dispatch = useDispatch()

  const [userEmail, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [valueError, setValueError] = useState(false)

  const onUserNameChanged = e => {setUserName(e.target.value)}
  const onPasswordChanged = e => {setPassword(e.target.value)}

  const canSubmit = userEmail && password
  const submitButtonClass = classNames({
    'muted-button': !canSubmit
  })

  const onSubmitButtonClicked = async e => {
    setValueError(false)
    let res = await dispatch(login({ email: userEmail, password }))
    if (!!res.payload.error) {
      setValueError(true)
    }
    else {
      setValueError(false)
      dispatch(fetchUsers())
        .then(() => {
          const userId = jwt.decode(res.payload).id
          dispatch(setCurrentUser(userId))
        })
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
