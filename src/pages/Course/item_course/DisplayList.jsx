import React, { useEffect } from 'react';
import './DisplayList.css';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { get, child, database, ref, set, remove, onValue } from '~/pages/Login';
import nen1 from 'src/img/anh nen 1.webp'; // with import
import nen2 from 'src/img/anh nen 2.webp'; // with import
import nen3 from 'src/img/anh nen 3.jpg'; // with import
import nen4 from 'src/img/anh nen 4.jpg'; // with import
import nen5 from 'src/img/anh nen 5.jpg'; // with import
import nen6 from 'src/img/anh nen 6.webp'; // with import
import nen7 from 'src/img/anh nen 8.webp'; // with import
import nen8 from 'src/img/anh nen 9.jpg'; // with import
import nen9 from 'src/img/anh nen 10.jpg'; // with import



// nameCourse: 'Lập trình nâng cao',
// nameGv: 'Nguyen Thi Lan',
// classCourse: 'L08',
const DisplayList = (props) => {
    const linkimg = [
        nen1,
        nen2,
        nen3,
        nen4,
        nen5,
        nen6,
        nen7,
        nen8,
        nen9,
        
    ];
    let index = props.index % linkimg.length;
    let dbRef = ref(database);
    // eslint-disable-next-line
    let [listgv, setlistgv] = useState();
    let standardizeEmail = sessionStorage.getItem('standardizeEmail');
    useEffect(() => {
        onValue(
            child(dbRef, `accounts/${standardizeEmail}/courses/current/changeInfor/${props.list.courseID}`),
            (snapshot) => {
                if (snapshot.exists()) {
                    setlistgv(snapshot.val());
                }
            },
        );
    // eslint-disable-next-line
    }, []);
    let [show, setshow] = useState(false);
    let selectref = useRef();

    return (
        <>
            <Link
                to="/course/content"
                className="display"
                onClick={() => {
                    localStorage.setItem('nameCourse', props.list.nameCourse);
                    localStorage.setItem('classCourse', props.list.classCourse);
                    localStorage.setItem('nameGv', props.list.nameGv);
                    localStorage.setItem('courseID', props.list.courseID);
                }}
            >
                <div className="display-content">
                    <div className="divimgcontent">
                        <img src={linkimg[index]} className="display-img" alt="" loading='lazy' />
                        <p className="imgcontent">{props.list.nameCourse}</p>
                    </div>

                    <div className="display-content-detail">
                        <p className="display-content-detail-x">{props.list.nameCourse}</p>
                        <p className="display-content-detail-namegv" style={{ marginTop: '20px' }}>{props.list.nameGv}</p>
                        <p className="display-content-detail-class" style={{ marginTop: '20px', fontWeight: 'bolder', color: 'blue' }}>
                            {props.list.classCourse}
                        </p>
                    </div>
                </div>
                {props.type === 'admin' && (
                    <div
                        className="blockchange"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div
                            className="btnchange"
                            onClick={() => {
                                setshow(!show);
                            }}
                        >
                            Sửa
                        </div>
                        <div
                            className="btnchange"
                            onClick={() => {
                                get(child(dbRef, `accounts/${standardizeEmail}/courses/current/courseInfor`)).then(
                                    (snapshot) => {
                                        if (snapshot.exists()) {
                                            let newCourseInfor = [];
                                            let deleteInfor = '';
                                            for (let i = 0; i < snapshot.size; i++) {
                                                if (i !== props.list.idx) {
                                                    newCourseInfor.push(snapshot.val()[i]);
                                                } else {
                                                    let substrings = snapshot.val()[i].split(/_(?=[A-Z]+\d+_)/);
                                                    deleteInfor = substrings[1].split('_')[0];
                                                }
                                            }
                                            set(
                                                child(
                                                    dbRef,
                                                    `accounts/${standardizeEmail}/courses/current/courseInfor`,
                                                ),
                                                newCourseInfor,
                                            );
                                            try {
                                                remove(
                                                    child(
                                                        dbRef,
                                                        `accounts/${standardizeEmail}/courses/current/changeInfor/${deleteInfor}`,
                                                    ),
                                                );
                                            } catch {
                                                console.log("can't remove");
                                            }
                                            //props.delete();
                                        }
                                    },
                                );
                            }}
                        >
                            Xóa
                        </div>
                    </div>
                )}
            </Link>
            {props.type === 'admin' && show && (
                <div className="change">
                    <div className="change-content">
                        <span className="title-content">Môn học</span>: {props.list.nameCourse}
                    </div>
                    <div className="change-content">
                        <span className="title-content">Mã lớp</span>: {props.list.classCourse}
                    </div>
                    <div className="change-content">
                        <span className="title-content">Giáo viên</span>
                        <span>: </span>
                        <select ref={selectref}>
                            <option value="" key="0">
                                Chọn tên giáo viên khác
                            </option>
                            {listgv.map((item, index) => {
                                return (
                                    <option value={item} key={index + 1}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="blockchange blockchange-control ">
                        <div
                            className="btnchange"
                            onClick={() => {
                                let name = selectref.current.options[selectref.current.selectedIndex].value;
                                if (name.length > 0) {
                                    set(
                                        child(
                                            dbRef,
                                            `accounts/${standardizeEmail}/courses/current/courseInfor/${props.list.idx}`,
                                        ),
                                        props.list.nameCourse +
                                            '_' +
                                            props.list.courseID +
                                            '_' +
                                            props.list.classCourse +
                                            '_' +
                                            name,
                                    );
                                    setshow(!show);
                                } else {
                                    alert('Please select option');
                                }
                            }}
                        >
                            Save
                        </div>
                        <div
                            className="btnchange"
                            onClick={() => {
                                selectref.current.selectedIndex = 0;
                                setshow(!show);
                            }}
                        >
                            Hủy
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(DisplayList);
