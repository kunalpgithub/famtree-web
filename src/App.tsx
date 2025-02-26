import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { db, auth } from './firebaseConfig'
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, getDocs } from 'firebase/firestore'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, 'messages'))
      const messagesList = querySnapshot.docs.map(doc => doc.data())
      setMessages(messagesList)
    }
    fetchMessages()
  }, [])

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in: ', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  const handleAddMessage = async () => {
    try {
      await addDoc(collection(db, 'messages'), {
        text: 'Hello, world!',
        createdAt: new Date(),
      })
      // Fetch messages again to update the list
      const querySnapshot = await getDocs(collection(db, 'messages'))
      const messagesList = querySnapshot.docs.map(doc => doc.data())
      setMessages(messagesList)
    } catch (error) {
      console.error('Error adding message: ', error)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {user ? (
          <>
            <p>Welcome, {user.displayName}</p>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleAddMessage}>Add Message</button>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>{message.text}</li>
              ))}
            </ul>
          </>
        ) : (
          <button onClick={handleSignIn}>Sign In with Google</button>
        )}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
