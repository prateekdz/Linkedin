import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      {/* If there is no user, render out Login Page. Otherwise render the app__body. */}
      {!user 
        ? <Login />
        : (<div className="app__body">
              <Sidebar />
              <Feed />
              <Widgets />
           </div>)
      }
    </div>
  );
}

export default App;
