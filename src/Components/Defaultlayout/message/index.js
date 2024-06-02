import classNames from 'classnames/bind';
import styles from './message.module.scss';
const cx = classNames.bind(styles);
function MessItem({ name, time, content, onClick }) {
    return (
        <div className={cx('body-item')} onClick={onClick}>
            <div className={cx('header-name')}>
                <img
                    src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                    alt="anh avatar"
                    className={cx('img')}
                />
                <p className={cx('name')}>{name}</p>
            </div>
            <div className={cx('viewer')}>
                <div className={cx('body')}>
                    <p>{content}</p>
                    <p className={cx('viewer-time')}>{time}</p>
                </div>
            </div>
        </div>
    );
}

export default MessItem;
