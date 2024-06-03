import classNames from 'classnames/bind';
import styles from './item.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function ItemMenu({ content, onClick, to }) {
    console.log(1);

    return (
        <Link
            className={cx('wrapper')}
            to={to}
            onClick={() => {
                if (to === '/') {
                    localStorage.removeItem('studentInfor');
                }
            }}
        >
            <span className={cx('content')}>{content}</span>
        </Link>
    );
}

export default ItemMenu;
