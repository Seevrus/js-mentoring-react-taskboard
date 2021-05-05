import { useState } from "react"
import classNames from 'classnames'

export const LoginPage = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const onUserNameChanged = e => {setUserName(e.target.value)}
  const onPasswordChanged = e => {setPassword(e.target.value)}

  const canSubmit = userName && password
  const submitButtonClass = classNames({
    'muted-button': !canSubmit
  })

  return (
    <div className="small-container" style={{ maxWidth: "400px" }}>
      <form>
        <label htmlFor="name">Email</label>
        <input 
          type="text" 
          id="name" 
          placeholder="username" 
          value={userName} 
          onChange={onUserNameChanged} />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password"
          value={password}
          onChange={onPasswordChanged} />
        <button type="button" className={submitButtonClass} disabled={!canSubmit}>Login</button>
      </form>
    </div>
  )
}