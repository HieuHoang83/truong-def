import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './subitem.module.scss';
import OnTime from '../OnTime/OnTime';
import { UseStore } from '~/Store';

const cx = classNames.bind(styles);

const SubItem = ({ id, title, starttime, starttime2, endtime, endtime2, ondelete, STT }) => {
    let [state] = UseStore();
    let { todos } = state;
    let [type] = useState(todos.job);

    const startParts = starttime.split('-');
    const startDate = new Date(startParts[0], startParts[1] - 1, startParts[2]);
    const startTimeParts = starttime2.split(':');
    startDate.setHours(parseInt(startTimeParts[0], 10));
    startDate.setMinutes(parseInt(startTimeParts[1], 10));

    const endParts = endtime.split('-');
    const endDate = new Date(endParts[0], endParts[1] - 1, endParts[2]);
    const endTimeParts = endtime2.split(':');
    endDate.setHours(parseInt(endTimeParts[0], 10));
    endDate.setMinutes(parseInt(endTimeParts[1], 10));

    useEffect(() => {
        if (startDate >= endDate) {
            ondelete();
        }
    });

    const now = new Date();
    const registrationOver = now >= endDate;
    const registrationNotYetDue = now <= startDate;

    return (
        <tr>
            <td>{STT}</td>
            <th className={cx('title')}>{title}</th>
            <td>
                {startParts[2] + '-' + startParts[1] + '-' + startParts[0]}
                <br />
                {starttime2}
            </td>
            <td>
                {endParts[2] + '-' + endParts[1] + '-' + endParts[0]} <br />
                {endtime2}
            </td>
            <td className={cx('content-item', 'regis')}>
                {registrationOver ? (
                    <p className={cx('overtime')}>Quá hạn</p>
                ) : registrationNotYetDue ? (
                    <p className={cx('not-due')}>Chưa tới hạn </p>
                ) : (
                    <OnTime id={id} />
                )}
            </td>
            {type === 'admin' && (
                <td>
                    <div className={cx('delete')} onClick={ondelete}>
                        <i className={cx('fa-regular', 'fa-trash-can')}></i>
                    </div>
                </td>
            )}
        </tr>
    );
};

export default SubItem;
