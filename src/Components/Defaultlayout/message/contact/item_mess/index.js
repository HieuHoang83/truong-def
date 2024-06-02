import classNames from 'classnames/bind';
import styles from './item_mess.module.scss';
const cx = classNames.bind(styles);
function ContactIteam({ name, content, day, time }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('header')}>{day}</p>
            <div className={cx('body')}>
                <div className={cx('contact')}>
                    <img
                        src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                        alt="avatar"
                        className={cx('avatar')}
                    />
                    <p className={cx('name')}>{name}</p>
                    <p className={cx('time')}>{time}</p>
                </div>
                <p className={cx('content')}>{content}</p>
                <div className={cx('arrow_left')}></div>
            </div>
        </div>
    );
}

export default ContactIteam;
