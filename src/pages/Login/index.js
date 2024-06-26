import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import logo from 'src/img/def_old.png'; // with import
import { Link, useNavigate } from 'react-router-dom';
import { UseStore } from '~/Store';
import { action } from '~/Store';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { useRef, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js';
import App from '~/App';
// nhanh master
const firebaseConfig = {
    apiKey: 'AIzaSyCraJtOXkitjV4HXKH9ntGGI9q-UEv4Y4k',
    authDomain: 'def-elearning.firebaseapp.com',
    projectId: 'def-elearning',
    storageBucket: 'def-elearning.appspot.com',
    messagingSenderId: '1090322590908',
    appId: '1:1090322590908:web:1914f2492fc6598cfb74b9',
};
//master
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage(app);
const cx = classNames.bind(styles);
function Login() {
    // eslint-disable-next-line
    let [state, dispatch] = UseStore();
    let messerroref = useRef();
    let [show, setshow] = useState(false);
    const navigate = useNavigate();

    let handlelogin = (e) => {
        e.preventDefault();
        let email = document.getElementById('login_email').value;
        let password = document.getElementById('login_password').value;
        console.log('ok');
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                const dbRef = ref(database);
                let standardizeEmail = email.replace(/[^\w\s]/gi, '');

                get(child(dbRef, `accounts/${standardizeEmail}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        var inforStudent;

                        if (snapshot.child('infor/job').val() !== 'admin') {
                            inforStudent = {
                                job: snapshot.child('infor/job').val(),
                                nameCard: snapshot.child('infor/nameCard').val(),
                                id: snapshot.child('infor/id').val(),
                                name: snapshot.child('infor/name').val(),
                                phone: snapshot.child('infor/phone').val(),
                                address: snapshot.child('infor/address').val(),
                                email: snapshot.child('infor/email').val(),
                                birthday: snapshot.child('infor/birthday').val(),
                                born: snapshot.child('infor/born').val(),
                                gender: snapshot.child('infor/gender').val(),
                                nameParent1: snapshot.child('infor/nameParent1').val(),
                                nameParent2: snapshot.child('infor/nameParent2').val(),
                                phoneParent1: snapshot.child('infor/phoneParent1').val(),
                                phoneParent2: snapshot.child('infor/phoneParent2').val(),
                                socialNetwork: snapshot.child('infor/socialNetwork').val(),
                                degree: snapshot.child('infor/degree').val(),
                            };
                        } else {
                            inforStudent = {
                                job: snapshot.child('infor/job').val(),
                            };
                        }

                        setshow(false);
                        dispatch(action.set_initstate(inforStudent));
                        localStorage.removeItem('studentInfor');
                        localStorage.setItem('studentInfor', JSON.stringify(inforStudent));
                        sessionStorage.setItem('standardizeEmail', standardizeEmail);
                        sessionStorage.setItem('login', true);
                        App();
                        navigate('/Home');
                        window.location.reload();
                        console.log(sessionStorage.getItem('standardizeEmail'));
                    }
                });
            })
            .catch(() => {
                setshow(true);
            });
    };

    return (
        <div className={cx('modul')}>
            <form className={cx('login')}>
                <div className={cx('login__header')}>
                    <img className={cx('login__header-img')} src={logo} alt="" />
                </div>

                <div className={cx('login__body')}>
                    <h1 className={cx('login__title')}>Đăng Nhập</h1>
                    <ul className={cx('login__body-list')}>
                        <li className={cx('login__body-list-item')}>
                            <div className={cx('icon__login')}>
                                <i className={cx('fa-solid', 'fa-user')}></i>
                            </div>
                            <input
                                type="text"
                                onChange={() => {
                                    setshow(false);
                                }}
                                onKeyUp={(e) => {
                                    if (e.which === 13) {
                                        handlelogin(e);
                                    }
                                }}
                                id="login_email"
                                className={cx('login__input')}
                                placeholder="Email trường"
                                required
                            />
                        </li>
                        <li className={cx('login__body-list-item')}>
                            <div className={cx('icon__login')}>
                                <i className={cx('fa-solid', 'fa-lock')}></i>
                            </div>
                            <input
                                type="password"
                                onChange={() => {
                                    setshow(false);
                                }}
                                onKeyUp={(e) => {
                                    if (e.which === 13) {
                                        handlelogin(e);
                                    }
                                }}
                                className={cx('login__input')}
                                placeholder="Mật khẩu"
                                required
                                id="login_password"
                            />
                        </li>
                    </ul>
                    {show && (
                        <div className={cx('err_message')} id="error" ref={messerroref}>
                            Sai tên đăng nhập hoặc mật khẩu.
                        </div>
                    )}
                </div>

                <Link to="/Home" className={cx('login__footer')} onClick={handlelogin}>
                    <p>Đăng Nhập</p>
                </Link>
            </form>
        </div>
    );
}

export default Login;
export { database, storage, auth };
export {
    getDatabase,
    ref,
    child,
    get,
    update,
    set,
    onValue,
    remove,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';
export {
    ref as ref_firestore,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js';
export { signOut } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
