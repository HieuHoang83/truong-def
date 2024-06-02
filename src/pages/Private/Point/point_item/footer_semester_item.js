import classNames from 'classnames/bind';
import styles from './point_item.module.scss';
const cx = classNames.bind(styles);
function Footer_Semester_Point({ fullnumber, semesternumber, diemtbhk, fulldiemtb }) {
    return (
        <ul className={cx('semester__footer')}>
            <li className={cx('semester__footer--item')}>
                <p>
                    Số tín chỉ đăng ký học kỳ : <b>{semesternumber}</b>
                </p>
            </li>
            <li className={cx('semester__footer--item')}>
                <p>
                    Số tín chỉ tích lũy học kỳ : <b>{semesternumber}</b>
                </p>
            </li>
            <li className={cx('semester__footer--item')}>
                <p>
                    Điểm trung bình học kỳ : <b>{diemtbhk}</b>
                </p>
            </li>
            <li className={cx('semester__footer--item')}>
                <p>
                    Số tín chỉ tích lũy : <b>{fullnumber}</b>
                </p>
            </li>
            <li className={cx('semester__footer--item')}>
                <p>
                    Điểm trung bình tích lũy :<b>{fulldiemtb}</b>
                </p>
            </li>
        </ul>
    );
}

export default Footer_Semester_Point;
