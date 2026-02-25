import React, { forwardRef } from 'react';
import './Post.css';
import InputOption from './InputOption';
import { Avatar } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
    return (
        <div ref={ref} className="post">
            <div className="post__header">
                <Avatar src={photoUrl}>{name[0]}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className="post__body">
                <p>{message}</p>
            </div>

            <div className="post__buttons">
                <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" iconColor="#666" />
                <InputOption Icon={ChatOutlinedIcon} title="Comment" iconColor="#666" />
                <InputOption Icon={ShareRoundedIcon} title="Share" iconColor="#666" />
                <InputOption Icon={SendRoundedIcon} title="Send" iconColor="#666" />
            </div>
        </div>
    );
})

export default Post;
