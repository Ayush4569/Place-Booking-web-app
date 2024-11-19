import React, { useState } from 'react'

function ChangeAccountDets() {
    const [newUserName,setNewUserName] = useState("")
    const [newEmail,setNewEmail] = useState("")
    const [newAvatar,setNewAvatar] = useState("")
  return (
    <div className="grow flex items-center justify-center mt-5">
    {/* <Message className="right-10 w-auto absolute top-28" message={message} />  */}
    <div className="mb-32 w-full">
      <h1 className="text-4xl text-center mb-4">Change Account Credentials</h1>
      <form
        // onSubmit={registerUser}
        className="mx-auto max-w-md"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Change username"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Change email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
     
        <label className="text-lg my-2">Change your profile image:</label>
        <input
          type="file"
          onChange={(e) => setNewAvatar(e.target.files[0])}
          name="newProfileImage"
          className="my-3"
        />
        <button type="submit" className="primary">
          Change credentials
        </button>
      </form>
    </div>
  </div>
  )
}

export default ChangeAccountDets