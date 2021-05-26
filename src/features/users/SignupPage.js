import { useState } from "react"
import classNames from 'classnames'
import { useDispatch } from "react-redux"
import { signup } from "../users/usersSlice"
import { useHistory } from "react-router"

import { setCurrentUser } from "../filters/filtersSlice"

export const SignupPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [userEmail, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [valueError, setValueError] = useState('')
  const [success, setSuccess] = useState(false)

  const onUserNameChanged = e => {setUserName(e.target.value)}
  const onPasswordChanged = e => {setPassword(e.target.value)}

  const canSubmit = userEmail && password
  const submitButtonClass = classNames({
    'muted-button': !canSubmit
  })

  const onSubmitButtonClicked = async e => {
    setValueError('')
    let res = await dispatch(signup({ email: userEmail, password }))
    if (!!res.payload.error) {
      setValueError(res.payload.error)
    }
    else {
      setSuccess(true)
      dispatch(setCurrentUser(res.payload.id))
      history.push('/taskboards')
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
          disabled={!canSubmit}>Signup</button>
      </form>
      {!!valueError ? <span style={{ color: "red" }}>{valueError}</span> : null}
      {success ? <span style={{ color: "green" }}>Successfully signed up!</span> : null}
    </div>
  )
}
