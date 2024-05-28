import classNames from 'classnames/bind';
import styles from './info.module.scss';
import { UseStore } from '~/Store';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Info({ onchange }) {
    let [state] = UseStore();
    let { todos } = state;
    let [type] = useState(todos.job);
    function typePerson(type) {
        if (type === 'student') return true;
        else if (type === 'teacher') return false;
    }

    return (
        <div className={cx('info-item', 'info', 'display__none', 'breadcrum__item-at-1')}>
            {typePerson(type) && <div className={cx('info__header')}>Thông tin cá nhân</div>}
            {!typePerson(type) && <div className={cx('info__header')}>Thông tin giảng viên</div>}

            <div className={cx('info__body')}>
                <div className={cx('info__blockInput')}>
                    <p className={cx('label-infor')}>Họ và tên</p>
                    <p className={cx('myInfor')}>{todos.name}</p>
                </div>

                {typePerson(type) && (
                    <div className={cx('info__blockInput')}>
                        <p className={cx('label-infor')}>Mã số sinh viên</p>
                        <p className={cx('myInfor')}>{todos.id}</p>
                    </div>
                )}

                {!typePerson(type) && (
                    <div className={cx('info__blockInput')}>
                        <p className={cx('label-infor')}>Mã số giảng viên</p>
                        <p className={cx('myInfor')}>{todos.id}</p>
                    </div>
                )}
                {!typePerson(type) && (
                    <div className={cx('info__blockInput')}>
                        <p className={cx('label-infor')}>Bằng cấp</p>
                        <p className={cx('myInfor')}>{todos.degree}</p>
                    </div>
                )}

                <div className={cx('info__blockInput')}>
                    <p className={cx('label-infor')}>Ngày sinh</p>
                    <p className={cx('myInfor')}>{todos.birthday}</p>
                </div>
                <div className={cx('info__blockInput')}>
                    <p className={cx('label-infor')}>Giới tính</p>
                    <p className={cx('myInfor')}>{todos.gender}</p>
                </div>
                <div className={cx('info__blockInput')}>
                    <p className={cx('label-infor')}>Nơi sinh</p>
                    <p className={cx('myInfor')}>{todos.born}</p>
                </div>
                <div className={cx('info__blockInput', 'info__blockInput-input')}>
                    <p className={cx('label-infor')}>Email cá nhân</p>
                    <p className={cx('myInfor')}>{todos.email}</p>
                </div>
                <div className={cx('info__blockInput', 'info__blockInput-input')}>
                    <p className={cx('label-infor')}>Số điện thoại</p>
                    <p className={cx('myInfor')}>{todos.phone}</p>
                </div>
                <div className={cx('info__blockInput', 'info__blockInput-input')}>
                    <p className={cx('label-infor')}> Mạng xã hội</p>
                    <a href={`${todos.socialNetwork}`} className={cx('myInfor', 'social')}>
                        {todos.socialNetwork}
                    </a>
                </div>
                <div className={cx('info__blockInput', 'info__blockInput-input')}>
                    <p className={cx('label-infor')}>Địa chỉ</p>
                    <p className={cx('myInfor')}>{todos.address}</p>
                </div>
                <div className={cx('info__header')}>Thông tin người thân </div>
                <div className={cx('info__blockInput', 'info__blockInput-input')}>
                    <p className={cx('label-infor')}>Tên người thân</p>
                    <p className={cx('myInfor')}>{todos.nameParent1}</p>
                </div>
                <div className={cx('info__blockInput', ' info__blockInput-input')}>
                    <p className={cx('label-infor')}>Số điện thoại người thân</p>
                    <p className={cx('myInfor')}>{todos.phoneParent1}</p>
                </div>
                <div className={cx('info__header')}>Thông tin người thân </div>
                <div className={cx('info__blockInput', 'info__blockInput-input')}>
                    <p className={cx('label-infor')}>Tên người thân</p>
                    <p className={cx('myInfor')}>{todos.nameParent2}</p>
                </div>
                <div className={cx('info__blockInput', 'info__blockInput-input')}>
                    <p className={cx('label-infor')}>Số điện thoại người thân</p>
                    <p className={cx('myInfor')}>{todos.phoneParent2}</p>
                </div>

                <div
                    className={cx('info__btn')}
                    onClick={() => {
                        onchange();
                    }}
                >
                    Cập nhật
                </div>
            </div>
        </div>
    );
}

export default Info;
