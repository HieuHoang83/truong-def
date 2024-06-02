import classNames from 'classnames/bind';
import styles from '../lich.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Calender_item({ date, content = [{ name: '', time: '', class: '' }], active }) {
    const [show, setshow] = useState(false);
    return (
        <>
            <div
                className={cx('calender-item', { active })}
                onClick={() => {
                    // console.log('click');
                    setshow(true);
                }}
            >
                <p className={cx('calender-item-day')}>{date}</p>
                {content[0] && (
                    <p className={cx('wrap')}>
                        <b className={cx('calender-item-title')}>{content[0].name}</b>
                    </p>
                )}
                {content[1] && (
                    <p className={cx('wrap')}>
                        <b className={cx('calender-item-title')}>{content[1].name}</b>
                    </p>
                )}
                {content[2] && (
                    <p className={cx('wrap')}>
                        <b className={cx('calender-item-title')}>{content[2].name}</b>
                    </p>
                )}
                {content[3] && (
                    <p className={cx('wrap')}>
                        <div className={cx('calender-item-vv')}>...</div>
                    </p>
                )}
            </div>
            {show && (
                <div className={cx('modal')}>
                    <div className={cx('modal-content')}>
                        <div
                            className={cx('modal-content-icon')}
                            onClick={() => {
                                setshow(false);
                            }}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <p className={cx('modal-content-header')}>{date}</p>

                        {content.map((item, index) => {
                            return (
                                <p className={cx('wrap-modal')} key={index}>
                                    <b className={cx('calender-item-title')}>{item.name} : </b> {item.time} {item.class}
                                </p>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default Calender_item;
