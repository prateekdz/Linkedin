import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import './Feed.css';
import InputOption from './InputOption';
import Post from './Post';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import FlipMove from 'react-flip-move';

function Feed() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => 
            setPosts(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
          );
    }, []);
    
    const sendPost = (e) => {
        e.preventDefault();

        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoURL || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateRoundedIcon />
                    <form action="">
                        <input 
                            value={input} 
                            onChange={e => setInput(e.target.value)}
                            type="text" 
                            placeholder="Start a post" 
                        />
                        <button onClick={sendPost} type="submit">
                            Send
                        </button>
                    </form>
                </div>

                <div className="feed__inputOptions">
                    <InputOption Icon={ImageRoundedIcon} title="Photo" iconColor="#70B5F9" />
                    <InputOption Icon={SubscriptionsRoundedIcon} title="Video" iconColor="#7FC15E" />
                    <InputOption Icon={EventNoteRoundedIcon} title="Event" iconColor="#E7A33E" />
                    <InputOption Icon={NotesRoundedIcon} title="Write an article" iconColor="#FC9295" />
                </div>
            </div>

            {/* Posts */}
            <FlipMove>
                {posts.map(({ id, data: { name, description, message, photoUrl } }) => 
                    <Post 
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                )}
            </FlipMove>
        </div>
    );
}

export default Feed;
