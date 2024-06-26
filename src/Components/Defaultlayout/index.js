import Header from './Header';
import classNames from 'classnames/bind';
import styles from './Defaultlayout.module.scss';
// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { UseStore } from '~/Store';
import { action } from '~/Store';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    document.onscroll = function () {
        let scrolltop = window.scrollY;
        if (scrolltop < 300) {
            if (document.querySelector(`.${cx('up')}`))
                document.querySelector(`.${cx('up')}`).classList.add(`${cx('display__none')}`);
        } else {
            if (document.querySelector(`.${cx('up')}`))
                document.querySelector(`.${cx('up')}`).classList.remove(`${cx('display__none')}`);
        }
    };
    // eslint-disable-next-line

    let [state, dispatch] = UseStore();
    let [show, setshow] = useState(false);
    useEffect(() => {
        if (state.todos.id === '') {
            let info = localStorage.getItem('studentInfor');
            // eslint-disable-next-line
            dispatch(action.set_initstate(JSON.parse(info)));
        }
        setTimeout(() => {
            setshow(true);
        }, 400);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Header onmess={() => {}}></Header>
            {show && (
                <div className={`${cx('wrapper')}`}>
                    <a className={cx('up', 'display__none')} href="#">
                        <i className={cx('fa-solid', 'fa-chevron-up')}></i>
                    </a>
                    <div className={cx('container')}>{children}</div>
                </div>
            )}
        </>
    );
}

export default DefaultLayout;
