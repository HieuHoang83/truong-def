import { UseStore } from '~/Store';
import { action } from '~/Store';
import { useRef } from 'react';
import { database, ref, update, child } from '~/pages/Login';
import classNames from 'classnames/bind';
import styles from './change.module.scss';
const cx = classNames.bind(styles);

/**/

/**/
function Change(onsave) {
    let [state, dispatch] = UseStore();
    let todos = { ...state.todos };
    let phoneref = useRef();
    let addressref = useRef();
    let emailref = useRef();
    let socialNetworkref = useRef();
    let nameParent1ref = useRef();
    let phoneParent1ref = useRef();
    let nameParent2ref = useRef();
    let phoneParent2ref = useRef();
    let nameCard = todos.nameCard;

    let handleSave = (e) => {
        e.preventDefault();
        /**/
        let checkInput = true;
        // condition each if statement
        /**/
        if (phoneref.current.value.trim().length > 0 && checkInput) {
            /**/
            if (phoneref.current.value[0] !== '0') {
                alert('Số điện thoại bắt đầu bằng 0');
                checkInput = false;
                phoneref.current.focus();
            } else if (phoneref.current.value.length !== 10) {
                alert('Chưa nhập đủ 10 số điện thoại');
                checkInput = false;
                phoneref.current.focus();
            }
            if (checkInput) {
                for (let i = 0; i < phoneref.current.value.length; i++) {
                    if (phoneref.current.value[i] < '0' || phoneref.current.value[i] > '9') {
                        alert('Số điện thoại phải chỉ chứa số');
                        checkInput = false;
                        break;
                    }
                }
            }
            if (checkInput) {
                todos.phone = phoneref.current.value;
                dispatch(action.set_Phone(phoneref.current.value));
            }
            /**/
        }
        if (addressref.current.value.trim().length > 0 && checkInput) {
            todos.address = addressref.current.value;
            dispatch(action.set_Address(addressref.current.value));
        }
        if (emailref.current.value.trim().length > 0 && checkInput) {
            if (!emailref.current.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                alert('Định dạng mail chưa đúng');
                checkInput = false;
                emailref.current.focus();
            }
            if (checkInput) {
                todos.email = emailref.current.value;
                dispatch(action.set_Email(emailref.current.value));
            }
        }
        // eslint-disable-next-line

        if (socialNetworkref.current.value.trim().length > 0 && checkInput) {
            // eslint-disable-next-line

            if (checkInput) {
                todos.socialNetwork = socialNetworkref.current.value;
                dispatch(action.set_SocialNetwork(socialNetworkref.current.value));
            }
        }
        if (nameParent1ref.current.value.trim().length > 0 && checkInput) {
            /**/
            todos.nameParent1 = nameParent1ref.current.value;
            dispatch(action.set_NameParent1(nameParent1ref.current.value));
            /**/
        }
        if (phoneParent1ref.current.value.trim().length > 0 && checkInput) {
            /**/
            if (phoneParent1ref.current.value[0] !== '0') {
                alert('Số điện thoại bắt đầu bằng 0');
                checkInput = false;
                phoneParent1ref.current.focus();
            } else if (phoneParent1ref.current.value.length !== 10) {
                alert('Chưa nhập đủ 10 số điện thoại');
                checkInput = false;
                phoneParent1ref.current.focus();
            }
            if (checkInput) {
                for (let i = 0; i < phoneParent1ref.current.value.length; i++) {
                    if (phoneParent1ref.current.value[i] < '0' || phoneParent1ref.current.value[i] > '9') {
                        alert('Số điện thoại phải chỉ chứa số');
                        checkInput = false;
                        break;
                    }
                }
            }
            if (checkInput) {
                todos.phoneParent1 = phoneParent1ref.current.value;
                dispatch(action.set_PhoneParent1(phoneParent1ref.current.value));
            }
            /**/
        }
        if (nameParent2ref.current.value.trim().length > 0 && checkInput) {
            todos.nameParent2 = nameParent2ref.current.value;
            dispatch(action.set_NameParent2(nameParent2ref.current.value));
        }
        if (phoneParent2ref.current.value.trim().length > 0 && checkInput) {
            /**/
            if (phoneParent2ref.current.value[0] !== '0') {
                alert('Số điện thoại bắt đầu bằng 0');
                checkInput = false;
            } else if (phoneParent2ref.current.value.length !== 10) {
                alert('Chưa nhập đủ 10 số điện thoại');
                checkInput = false;
                phoneParent2ref.current.focus();
            }
            if (checkInput) {
                for (let i = 0; i < phoneParent2ref.current.value.length; i++) {
                    if (phoneParent2ref.current.value[i] < '0' || phoneParent2ref.current.value[i] > '9') {
                        alert('Số điện thoại phải chỉ chứa số');
                        checkInput = false;
                        break;
                    }
                }
            }
            if (checkInput) {
                todos.phoneParent2 = phoneParent2ref.current.value;
                dispatch(action.set_PhoneParent2(phoneParent2ref.current.value));
            }
            /**/
        }
        /**/
        if (checkInput)
            /**/
            setTimeout(() => {
                localStorage.removeItem('studentInfor', JSON.stringify(todos));
                localStorage.setItem('studentInfor', JSON.stringify(todos));
                let standardizeEmail = sessionStorage.getItem('standardizeEmail');
                const dbRef = ref(database);
                // console.log(todos)
                let update_db = todos;
                // console.log(todos);
                update(child(dbRef, `accounts/${standardizeEmail}/infor`), update_db);
            }, 500);
        /**/
        if (checkInput) {
            /**/
            phoneref.current.value = '';
            phoneParent2ref.current.value = '';
            addressref.current.value = '';
            emailref.current.value = '';
            socialNetworkref.current.value = '';
            nameParent1ref.current.value = '';
            phoneParent1ref.current.value = '';
            nameParent2ref.current.value = '';
            phoneParent2ref.current.value = '';

            onsave.onsave();
        }
    };
    return (
        <main className={cx('info-item', 'change-info')}>
            <h1 className={cx('change-info__decoration')}> Cập nhật thông tin liên lạc</h1>
            <div className={cx('change-info__body')}>
                <form className={cx('change-info__me')}>
                    <label className={cx('change-info__me-header')}>Thay đổi thông tin cá nhân</label>
                    <div className={cx('change-info__me-block')}>
                        <label className={cx('change-info__label')} htmlFor="mytel">
                            Số điện thoại
                        </label>
                        <input
                            ref={phoneref}
                            type="tel"
                            className={cx('change-info__input')}
                            placeholder="Số điện thoại liên lạc"
                            id="mytel"
                        />
                    </div>
                    <div className={cx('change-info__me-block')}>
                        <label className={cx('change-info__label')} htmlFor="myaddress">
                            Nơi ở hiện tại của {nameCard}{' '}
                        </label>
                        <input
                            ref={addressref}
                            type="text"
                            className={cx('change-info__input')}
                            placeholder="Địa chỉ hiện tại"
                            id="myaddress"
                        />
                    </div>
                    <div className={cx('change-info__me-block')}>
                        <label className={cx('change-info__label')} htmlFor="myemail">
                            Địa chỉ email cá nhân
                        </label>
                        <input
                            ref={emailref}
                            type="email"
                            className={cx('change-info__input')}
                            placeholder="Email khác @def.edu.vn"
                            id="myemail"
                        />
                    </div>
                    <div className={cx('change-info__me-block')}>
                        <label className={cx('change-info__label')} htmlFor="mysocial">
                            Trang mạng xã hội cá nhân{' '}
                        </label>
                        <input
                            type="text"
                            className={cx('change-info__input')}
                            ref={socialNetworkref}
                            placeholder="Link facebook, instagram..."
                            id="mysocial"
                        />
                    </div>
                </form>
                <form className={cx('change-info__family')}>
                    <label className={cx('change-info__me-header')}>Thay đổi thông tin người thân</label>
                    <div className={cx('change-info__me-block')}>
                        <label className={cx('change-info__label')} htmlFor="nameParent1">
                            Tên người thân(1)
                        </label>
                        <input
                            type="text"
                            className={cx('change-info__input')}
                            ref={nameParent1ref}
                            placeholder="Họ và tên người thân"
                            id="nameParent1"
                        />
                    </div>
                    <div className={cx('change-info__me-block')}>
                        <label className={cx('change-info__label')} htmlFor="tellParent1">
                            Số điện thoại người thân
                        </label>
                        <input
                            type="text"
                            className={cx('change-info__input')}
                            placeholder="Số điện thoại liên lạc"
                            ref={phoneParent1ref}
                            id="tellParent1"
                        />
                    </div>
                    <div className={cx('change-info__me-block')}>
                        <label className={cx('change-info__label')} htmlFor="nameParent2">
                            Tên người thân(2)
                        </label>
                        <input
                            ref={nameParent2ref}
                            type="text"
                            className={cx('change-info__input')}
                            placeholder="Họ và tên người thân khác khi không liên hệ được người trên "
                            id="nameParent2"
                        />
                    </div>
                    <div className={cx('change-info__me-block')}>
                        <label className={cx('change-info__label')} htmlFor="tellParent2">
                            Số điện thoại người thân
                        </label>
                        <input
                            type="text"
                            className={cx('change-info__input')}
                            placeholder="Số điện thoại liên lạc"
                            ref={phoneParent2ref}
                            id="tellParent2"
                        />
                    </div>
                </form>
                <button className={cx('change-info__btn')} onClick={(e) => handleSave(e)}>
                    Lưu thông tin
                </button>
            </div>
        </main>
    );
}

export default Change;
