import classNames from 'classnames/bind';
import styles from './semester_container.module.scss';
import Point_course from './point_course';
import { useState } from 'react';
import { database } from '~/pages/Login';

const cx = classNames.bind(styles);

function Semester__body({ list }) {
    // eslint-disable-next-line
    const [courses] = useState(list);

    return (
        <div key="semester__body__body" className={cx('semester__body')}>
            <ul key="semester__body__list" className={cx('header', 'active')}>
                <li key="Ma_MH" className={cx('Ma_MH', 'MH_item')}>
                    <p> MÃ MH</p>
                </li>
                <li key="Ten_MH" className={cx('Ten_MH', 'MH_item')}>
                    <p>TÊN MÔN HỌC</p>
                </li>
                <li key="Nhom_MH" className={cx('Nhom_MH', 'MH_item')}>
                    <p>NHÓM-TỔ</p>
                </li>
                <li key="TinChi_MH" className={cx('TinChi_MH', 'MH_item')}>
                    <p>SỐ TC</p>
                </li>
                <li key="Diem_MH" className={cx('Diem_MH', 'MH_item')}>
                    <p>ĐIỂM THÀNH PHẦN</p>
                </li>
                <li key="DiemCK_MH" className={cx('DiemCK_MH', 'MH_item')}>
                    <p>ĐIỂM THI</p>
                </li>
                <li key="DiemTk_MH" className={cx('DiemTk_MH', 'MH_item')}>
                    <p>TỔNG KẾT</p>
                </li>
            </ul>
            {courses.map((item, index) => {
                //eslint-disable-next-line
                return <Point_course key={`${item.Ma_MH}-${index}`} {...item} />;
            })}
        </div>
    );
}

export default Semester__body;
