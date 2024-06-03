import classNames from 'classnames/bind';
import styles from './semester_container.module.scss';
const cx = classNames.bind(styles);
function Point_course({ Ma_MH, Ten_MH, Nhom_MH, TinChi_MH, Diem_MH, DiemCK_MH, DiemTk_MH }) {
    return (
        <tr className={cx('header')}>
            <th>{Ma_MH}</th>
            <td>{Ten_MH}</td>
            <td>{Nhom_MH}</td>
            <td>{TinChi_MH}</td>
            <td>{Diem_MH}</td>
            <td>{DiemCK_MH}</td>
            <td>{DiemTk_MH}</td>
        </tr>
    );
}

export default Point_course;
