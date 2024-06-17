import styles from './Header.module.scss';
import stylescontainer from '../Defaultlayout.module.scss';

import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import def from 'src/img/def_old.png'; // with import
import { database, get, child, ref, set, onValue, auth, signOut } from '~/pages/Login';
import { UseStore } from '~/Store';

import 'tippy.js/dist/tippy.css'; // optional
import { Wrapper as ProperWrapper } from '../proper';
import { Link } from 'react-router-dom';
import Notify from '../notifyItem/NotifyMenu';
import Message from '../message/MessMenu';
import { useState } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function Header({ Active = true, Private = false, Course = false }) {
    let [name, setName] = useState({ page_Home: Active, page_Private: Private, page_Course: Course });
    const dbRef = ref(database);

    let standardizeEmail = sessionStorage.getItem('standardizeEmail');
    if (window.location.href === 'http://localhost:3000/calender') {
        if (name.page_Home || name.page_Private || name.page_Course) {
            setName({
                page_Home: false,
                page_Private: false,
                page_Course: false,
            });
        }
    }
    if (window.location.href === 'http://localhost:3000/Home') {
        if (name.page_Private || name.page_Course) {
            setName({
                page_Home: true,
                page_Private: false,
                page_Course: false,
            });
        }
    }
    if (window.location.href === 'http://localhost:3000/course/addcourse') {
        if (name.page_Home || name.page_Private || name.page_Course) {
            setName({
                page_Home: false,
                page_Private: false,
                page_Course: false,
            });
        }
    }
    if (window.location.href === 'http://localhost:3000/course/addcourse/list') {
        if (name.page_Home || name.page_Private || name.page_Course) {
            setName({
                page_Home: false,
                page_Private: false,
                page_Course: false,
            });
        }
    }

    if (window.location.href === 'http://localhost:3000/course/content') {
        if (name.page_Home || name.page_Private || name.page_Course) {
            setName({
                page_Home: false,
                page_Private: false,
                page_Course: false,
            });
        }
    }
    if (window.location.href === 'http://localhost:3000/private') {
        if (!name.page_Private) {
            setName({
                page_Home: false,
                page_Private: true,
                page_Course: false,
            });
        }
    }
    if (window.location.href === 'http://localhost:3000/course') {
        if (!name.page_Course) {
            setName({
                page_Home: false,
                page_Private: false,
                page_Course: true,
            });
        }
    }

    let [state] = UseStore();
    let { todos } = state;
    let [type] = useState(todos.job);
    let page_Home = name.page_Home;
    let page_Private = name.page_Private;
    let page_Course = name.page_Course;
    const [isnotify, SetIsnotify] = useState(false);
    const [Notify_list, setNotify_list] = useState([]);
    const [courseID] = useState(localStorage.getItem('courseID'));
    const [classCourse] = useState(localStorage.getItem('classCourse'));
    useEffect(() => {
        onValue(child(dbRef, `accounts/${standardizeEmail}/notification`), (snapshot) => {
            if (snapshot.exists()) {
                const addNoti = [];
                for (let i = snapshot.size - 1; i >= 0; i--) {
                    addNoti.push({
                        title: snapshot.val()[i].title,
                        time: snapshot.val()[i].time,
                        active: snapshot.val()[i].active,
                    });
                }
                setNotify_list(addNoti);
            }
        });

        // eslint-disable-next-line
    }, []);
    let numbernotify = 0;
    const [ismess, SetIsmess] = useState(false);

    Notify_list.forEach((item, index) => {
        if (item.active === true) {
            numbernotify++;
        }
    });

    return (
        <header className={cx('wraper')}>
            <div className={cx('inner')}>
                <nav className={cx('control')}>
                    <Link
                        className={cx('logo')}
                        to="/Home"
                        onClick={() => {
                            setName({
                                page_Home: true,
                                page_Private: false,
                                page_Course: false,
                            });
                            if (!page_Home) {
                                SetIsmess(false);
                                SetIsnotify(false);
                            }
                        }}
                    >
                        <img className={cx('narbar__list-item-img')} src={def} alt="" />
                    </Link>
                    <Link
                        to="/Home"
                        className={cx('narbar__link-control--home', { page_Home })}
                        onClick={() => {
                            setName({
                                page_Home: true,
                                page_Private: false,
                                page_Course: false,
                            });
                            if (!page_Home) {
                                SetIsmess(false);
                                SetIsnotify(false);
                            }
                        }}
                    >
                        Home
                    </Link>
                    <Link
                        to="/private"
                        className={cx('narbar__link-control--info', { page_Private })}
                        onClick={() => {
                            setName({
                                page_Home: false,
                                page_Private: true,
                                page_Course: false,
                            });

                            if (!page_Private) {
                                SetIsmess(false);
                                SetIsnotify(false);
                            }
                        }}
                    >
                        <span className={cx('mobile')}>Information</span>
                    </Link>
                    <Link
                        to="/course"
                        className={cx('narbar__link-control--course', { page_Course })}
                        onClick={() => {
                            setName({
                                page_Home: false,
                                page_Private: false,
                                page_Course: true,
                            });
                            if (!page_Course) {
                                SetIsmess(false);
                                SetIsnotify(false);
                            }
                        }}
                    >
                        Course
                    </Link>
                </nav>

                <ul className={cx('active')}>
                    {type !== 'admin' && (
                        <li className={cx('notify')}>
                            <button
                                onClick={() => {
                                    const notify = document.querySelector(`.${cx('box-notify')}`);
                                    const boxmess = document.querySelector(`.${cx('box-mess')}`);
                                    console.log(notify.style.visibility);
                                    if (notify.style.visibility === 'visible') {
                                        notify.style.visibility = 'hidden';
                                        notify.style.scale = 0;
                                        notify.style.opacity = 0;

                                        let newlist = [...Notify_list];
                                        if (
                                            newlist.every((item) => {
                                                return item.active;
                                            })
                                        ) {
                                            newlist.forEach((item) => {
                                                item.active = false;
                                            });
                                            get(child(dbRef, `accounts/${standardizeEmail}/notification`)).then(
                                                (snapshot) => {
                                                    if (snapshot.exists()) {
                                                        for (let i = snapshot.size - 1; i >= 0; i--) {
                                                            set(
                                                                child(
                                                                    dbRef,
                                                                    `accounts/${standardizeEmail}/notification/${i}/active`,
                                                                ),
                                                                false,
                                                            );
                                                        }
                                                        setNotify_list(newlist);
                                                    }
                                                },
                                            );
                                        }
                                    } else {
                                        notify.style.visibility = 'visible';
                                        boxmess.style.visibility = 'hidden';
                                        boxmess.style.right = '-100%';
                                        boxmess.style.opacity = 0;

                                        notify.style.scale = 1;
                                        notify.style.opacity = 1;
                                    }

                                    document
                                        .querySelector(`.${cx('table-user')}`)
                                        .classList.add(`${cx('display__none')}`);
                                }}
                            >
                                <i className={cx('iconbell', 'fa-regular', 'fa-bell')}></i>
                            </button>
                            <div className={cx('box-notify')}>
                                <ProperWrapper>
                                    <Notify list={Notify_list} courseID={courseID} classCourse={classCourse} />
                                </ProperWrapper>
                            </div>

                            {numbernotify > 0 && numbernotify <= 10 && (
                                <div
                                    className={cx('number-notify', 'mall')}
                                    onClick={() => {
                                        if (isnotify === true) {
                                            let newlist = [...Notify_list];
                                            if (
                                                newlist.every((item) => {
                                                    return !item.active;
                                                })
                                            ) {
                                                setTimeout(() => {
                                                    SetIsnotify(!isnotify);
                                                }, 100);
                                            } else {
                                                setTimeout(() => {
                                                    SetIsnotify(!isnotify);
                                                }, 100);
                                                newlist.forEach((item) => {
                                                    item.active = false;
                                                });
                                                get(child(dbRef, `accounts/${standardizeEmail}/notification`)).then(
                                                    (snapshot) => {
                                                        if (snapshot.exists()) {
                                                            for (let i = snapshot.size - 1; i >= 0; i--) {
                                                                set(
                                                                    child(
                                                                        dbRef,
                                                                        `accounts/${standardizeEmail}/notification/${i}/active`,
                                                                    ),
                                                                    false,
                                                                );
                                                            }
                                                            setNotify_list(newlist);
                                                        }
                                                    },
                                                );
                                            }
                                        } else {
                                            SetIsnotify(!isnotify);
                                        }
                                        SetIsmess(false);
                                    }}
                                >
                                    {numbernotify}
                                </div>
                            )}
                            {numbernotify > 0 && numbernotify > 10 && (
                                <div
                                    className={cx('number-notify', 'large')}
                                    onClick={() => {
                                        if (isnotify === true) {
                                            let newlist = [...Notify_list];
                                            if (
                                                newlist.every((item) => {
                                                    return !item.active;
                                                })
                                            ) {
                                                setTimeout(() => {
                                                    SetIsnotify(!isnotify);
                                                }, 200);
                                            } else {
                                                setTimeout(() => {
                                                    SetIsnotify(!isnotify);
                                                }, 200);
                                                newlist.forEach((item) => {
                                                    item.active = false;
                                                });
                                                get(child(dbRef, `accounts/${standardizeEmail}/notification`)).then(
                                                    (snapshot) => {
                                                        if (snapshot.exists()) {
                                                            for (let i = snapshot.size - 1; i >= 0; i--) {
                                                                set(
                                                                    child(
                                                                        dbRef,
                                                                        `accounts/${standardizeEmail}/notification/${i}/active`,
                                                                    ),
                                                                    false,
                                                                );
                                                            }
                                                            setNotify_list(newlist);
                                                        }
                                                    },
                                                );
                                            }
                                        } else {
                                            setTimeout(() => {
                                                SetIsnotify(!isnotify);
                                            }, 200);
                                        }
                                        SetIsmess(false);
                                    }}
                                >
                                    32
                                </div>
                            )}
                        </li>
                    )}

                    {type !== 'admin' && (
                        <li className={cx('mess')}>
                            <button
                                onClick={() => {
                                    const notify = document.querySelector(`.${cx('box-notify')}`);
                                    const boxmess = document.querySelector(`.${cx('box-mess')}`);
                                    if (boxmess.style.visibility === 'visible') {
                                        boxmess.style.visibility = 'hidden';
                                        boxmess.style.opacity = 0;
                                        boxmess.style.right = '-100%';
                                    } else {
                                        boxmess.style.visibility = 'visible';
                                        boxmess.style.right = '0%';

                                        boxmess.style.opacity = 1;
                                        notify.style.visibility = 'hidden';
                                        notify.style.scale = 0;
                                        notify.style.opacity = 0;
                                    }

                                    document
                                        .querySelector(`.${cx('table-user')}`)
                                        .classList.add(`${cx('display__none')}`);
                                }}
                                className={cx('button-mess')}
                            >
                                <i className="fa-regular fa-comment"></i>
                            </button>

                            <div className={cx('box-mess')}>
                                <Message
                                    onClick={() => {
                                        const boxmess = document.querySelector(`.${cx('box-mess')}`);

                                        boxmess.style.visibility = 'hidden';
                                        boxmess.style.right = '-100%';
                                        boxmess.style.opacity = 0;
                                        if (window.screen.width <= 723) {
                                            document.querySelector(`.${stylescontainer.container}`).style.height =
                                                'auto';
                                            document.querySelector(`.${stylescontainer.container}`).style.overflow =
                                                'auto';
                                        }
                                    }}
                                />
                            </div>
                        </li>
                    )}

                    <li className={cx('user')}>
                        <button
                            onClick={() => {
                                document
                                    .querySelector(`.${cx('table-user')}`)
                                    .classList.toggle(`${cx('display__none')}`);
                                const notify = document.querySelector(`.${cx('box-notify')}`);

                                if (notify && notify.style.visibility == 'visible') {
                                    notify.style.visibility = 'hidden';
                                    notify.style.scale = 0;
                                    notify.style.opacity = 0;
                                }
                                const boxmess = document.querySelector(`.${cx('box-mess')}`);
                                if (boxmess && boxmess.style.visibility == 'visible') {
                                    boxmess.style.visibility = 'hidden';
                                    boxmess.style.right = '-100%';
                                    boxmess.style.opacity = 1;
                                }
                            }}
                        >
                            <img
                                src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg"
                                alt=""
                                className={cx('avatar')}
                            />
                        </button>

                        <nav className={cx('table-user', 'display__none')}>
                            {type !== 'teacher' && (
                                <Link
                                    to="/course/addcourse"
                                    className={cx('item-user')}
                                    onClick={() => {
                                        document
                                            .querySelector(`.${cx('table-user')}`)
                                            .classList.toggle(`${cx('display__none')}`);
                                    }}
                                >
                                    Đăng ký môn
                                </Link>
                            )}
                            {type !== 'admin' && (
                                <Link
                                    to="/calender"
                                    className={cx('item-user')}
                                    onClick={() => {
                                        document
                                            .querySelector(`.${cx('table-user')}`)
                                            .classList.toggle(`${cx('display__none')}`);
                                    }}
                                >
                                    Lịch
                                </Link>
                            )}
                            <Link
                                to="/"
                                className={cx('item-user')}
                                onClick={() => {
                                    document
                                        .querySelector(`.${cx('table-user')}`)
                                        .classList.toggle(`${cx('display__none')}`);
                                    signOut(auth).then(() => {
                                        sessionStorage.removeItem('login');
                                        sessionStorage.removeItem('standardizeEmail');
                                    });
                                }}
                            >
                                Đăng xuất
                            </Link>
                        </nav>
                    </li>
                </ul>
            </div>
        </header>
    );
}
export default Header;
