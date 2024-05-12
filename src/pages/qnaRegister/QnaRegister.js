import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasicButton from '../../components/button/BasicButton.jsx';
import S from './style.js';

const QnaRegister = () => {
  const [qnaregister, setQnaRegister] = useState({
    category: '',
    title: '',
    content: '',
    no: null, 
  });

  useEffect(() => {
    fetch('http://localhost:8004/qnalist/list/')
      .then((res) => res.json())
      .then((data) => {
        setQnaRegister((prev) => ({
          ...prev,
          no: data.no + 1, 
          date: data.date, 
        }));
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:8004/qnaexplain/list/')
      .then((res) => res.json())
      .then((data) => {
        setQnaRegister((prev) => ({
          ...prev,
          no: data.no + 1, 
          date: data.date, 
        }));
      })
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQnaRegister({ ...qnaregister, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8004/qnaexplain/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...qnaregister,
        date: new Date().toISOString(), 
      }),
    })
    .then((res) => {
      return res.json();
    })

    fetch('http://localhost:8004/qnalist/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...qnaregister,
        date: new Date().toISOString(), 
      }),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setQnaRegister((prevState) => ({
        ...prevState,
        no: prevState.no + 1,
      }));
      alert('글 등록이 완료되었습니다.');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('글 등록 중 오류');
    });
  };


  return (
    <>
      <S.CenteredContainer>
        <S.StyledHeader>
          QnA
        </S.StyledHeader>
        <S.StyledHeaderBox>
          <p style={{ marginLeft: '120px'}}>빠른 시일 내에 답변드리겠습니다</p>
        </S.StyledHeaderBox>
      </S.CenteredContainer>

      <div>
        <S.subtitle>
          <p >카테고리 </p> <S.subp>(필수 항목)</S.subp>
          <p style={{ marginLeft: '400px'}}>구분 </p><S.subp>(필수 항목)</S.subp>
        </S.subtitle>

        <S.inputbox>
        <S.category name="category"  value={qnaregister.category} onChange={handleChange}>
          <option value="">카테고리를 선택하세요</option>
          <option value="이용정보">이용정보</option>
          <option value="온라인예매/우대정보">온라인예매/우대정보</option>
          <option value="연간이용">연간이용</option>
          <option value="기타">기타</option>
          <option value="장애인 탑승예약제">장애인 탑승예약제</option>
          <option value="탑승예약제/싱글라이더">탑승예약제/싱글라이더</option>
        </S.category>
        <S.category name="division" value={qnaregister.division} onChange={handleChange} style={{ marginLeft: '200px'}}>
          <option value="">방문 전</option>
          <option value="방문 후">방문 후</option>
        </S.category>
        </S.inputbox>
      </div>

      <div>
        <S.subtitle>
          <p>제목 </p><S.subp style={{ marginRight: '540px'}}>(필수 항목)</S.subp>
        </S.subtitle>

        <S.inputbox>
          <S.StyledInput style={{ width: '850px'}} type="text" name="title" placeholder="제목을 입력해주세요."  value={qnaregister.title} onChange={handleChange} />
        </S.inputbox>
      </div>

      <div>
        <S.subtitle>
          <p>내용 </p><S.subp style={{ marginRight: '540px'}}>(필수 항목)</S.subp>
        </S.subtitle>

        <S.inputbox>
          <S.StyledInput style={{ width: '850px', height: '300px'}} type="text" name="content" placeholder="내용을 입력해주세요." value={qnaregister.content} onChange={handleChange} />
        </S.inputbox>
      </div>

      <S.buttonbox>
        
          <BasicButton style={{backgroundColor: "white", color:"#1FB1D9", border:"1px solid #1FB1D9"}} size={"small"} shape={"default"} color={"white"} variant={"main"}>
          <Link to={`/qna/list`}>뒤로가기
          </Link>
          </BasicButton>
        

        <BasicButton style={{marginLeft: '250px'}} size={"small"} shape={"default"} color={"white"} variant={"main"} onClick={handleSubmit}>
          <Link style={{color:"#fff"}} to={`/qna/list`}>등록하기</Link>
        </BasicButton>
      </S.buttonbox>
    </>
  );
};

export default QnaRegister;
