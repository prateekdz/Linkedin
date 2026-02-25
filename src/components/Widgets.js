import React from 'react';
import './Widgets.css';
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {
    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon className="widgets__articleIcon" />
            </div>

            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>

            {newsArticle("Get job ready with Jobs Bootcamp", "Top News - 31,407 readers")}
            {newsArticle("The skills employers are looking for", "1d ago - 892 readers")}
            {newsArticle("How WFH is impacting women", "7h ago - 1,996 readers")}
            {newsArticle("IT majors rethink return to office", "2d ago - 8,555 readers")}
            {newsArticle("The fastest growing jobs in India", "2d ago - 16,376 readers")}
        </div>
    );
}

export default Widgets;
