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
        <table key="semester__body__body" className={cx('semester__body')}>
            <thead key="semester__body__list" className={cx('header', 'active')}>
                <tr key="0">
                    <th key="Ma_MH">
                        <p> MÃ MH</p>
                    </th>
                    <th key="Ten_MH">
                        <p>TÊN MÔN HỌC</p>
                    </th>
                    <th key="Nhom_MH">
                        <p>NHÓM-TỔ</p>
                    </th>
                    <th key="TinChi_MH">
                        <p>SỐ TC</p>
                    </th>
                    <th key="Diem_MH">
                        <p>ĐIỂM THÀNH PHẦN</p>
                    </th>
                    <th key="DiemCK_MH">
                        <p>ĐIỂM THI</p>
                    </th>
                    <th key="DiemTk_MH">
                        <p>TỔNG KẾT</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                {courses.map((item, index) => {
                    //eslint-disable-next-line
                    return <Point_course key={`${item.Ma_MH}-${index}`} {...item} />;
                })}
            </tbody>
        </table>
    );
}

export default Semester__body;
