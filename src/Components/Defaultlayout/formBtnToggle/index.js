import styles from './formBtnToggle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function FormBtnToggle({ content, setting1, setting2, className }) {
    const classes = cx('labelCheckbox', {
        [className]: { className },
    });
    return (
        <div className={cx('formbox')}>
            <input type="checkbox" id="checkbox" hidden />

            <label htmlFor="checkbox" setting1={setting1} setting2={setting2} className={classes}>
                {content}
            </label>
        </div>
    );
}

export default FormBtnToggle;
