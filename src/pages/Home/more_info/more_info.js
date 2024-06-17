import React, { useState } from 'react';
import styles1 from './more_info.module.scss';

const CardComponent = ({ title, content, imageUrl, text_more }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [hideTitleOutside, setHideTitleOutside] = useState(false);

    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };

    return (
        <div className={styles1.cardContainer}>
            <div className={styles1.card} style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: 'center' }}>
                <div className={styles1.cardContent}>
                    <p className={styles1.cardTitle}>{title}</p>
                    <p className={styles1.cardDescription}>{content}</p>
                    <div className={styles1.cardButton}>
                        <button className={styles1.button} onClick={toggleDetail}>
                            More Info
                        </button>
                    </div>
                    {showDetail && <div className={styles1.detailContent}>{text_more}</div>}
                </div>
            </div>
            <img src={imageUrl} alt="Thumbnail" className={styles1.cardImage} />
            <div className={styles1.cardImageDiv}>
                <p className={styles1.cardTitleOutSide}>{title}</p>
            </div>
        </div>
    );
};

export default CardComponent;
