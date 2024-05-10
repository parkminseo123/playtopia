import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BasicButton from '../../components/button/BasicButton.jsx';
import S from './style.js';

const LostnFoundRegisterSeoulland = () => {
  const [lostnseouland, setLostnSeoulland] = useState({
    item: '',
    found: '',
    content: '',
    no: null,
    result: "보관중",
    date: new Date().toISOString(),
    company: "seoulland"
  });

  useEffect(() => {
    fetch('http://localhost:8010/lostnfoundlist/latest')
      .then((res) => res.json())
      .then((data) => {
        setLostnSeoulland((prev) => ({
          ...prev,
          no: data.no + 1, 
          date: data, 
        }));
      })
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLostnSeoulland({ ...lostnseouland, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  fetch('http://localhost:8010/lostnfoundlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...lostnseouland,
      date: new Date(), 
    }),
  })
  .then((res) => res.json())
  .then((data) => {
    setLostnSeoulland((prevState) => ({
      ...prevState,
      no: prevState.no + 1,
    }));
    alert('글 등록이 완료되었습니다.');
  })
};

  return (
    <>
      <S.margin></S.margin>
      <S.head>
        <S.header>
          <h1>분실물 센터</h1>
        </S.header>
        <S.title>
          <Link to={"/lostnfound/register/lotteworld"} ><S.lotteworld>롯데월드</S.lotteworld></Link>
          <Link to={"/lostnfound/register/everland"} ><S.everland >에버랜드</S.everland ></Link>
          <S.seoulland color='#1FB1D9'>서울랜드</S.seoulland>
        </S.title>
      </S.head>

      <S.header>
      <h1 style={{marginRight:"600px", marginBottom:"60px"}}>분실물 등록</h1>
      
      </S.header>

      <div>
        <S.subtitle>
          <p>종류 </p> <S.subp>(필수 항목)</S.subp>
          <p style={{ marginLeft: '400px' }}>장소 </p><S.subp>(필수 항목)</S.subp>
        </S.subtitle>

        <S.inputbox>
          <S.StyledInput type='text' name='item'placeholder="종류"  value={lostnseouland.item} onChange={handleChange} />
          <S.StyledInput style={{ marginLeft: '250px' }} type='text' name='found' placeholder="장소" value={lostnseouland.found} onChange={handleChange} />
        </S.inputbox>
      </div>

      <div>
        <S.subtitle>
          <p>내용 </p><S.subp style={{ marginRight: '540px' }}>(필수 항목)</S.subp>
        </S.subtitle>

        <S.inputbox>
          <S.StyledInput style={{ width: '850px', height: '300px' }} type="text" name="content" placeholder="내용을 입력해주세요." value={lostnseouland.content} onChange={handleChange} />
        </S.inputbox>
      </div>

      <S.buttonbox>
          <BasicButton style={{ backgroundColor: "white", color: "#1FB1D9", border: "1px solid #1FB1D9" }}
            size={"small"} shape={"default"} color={"white"} variant={"main"}>
              <Link style={{ color:"#1FB1D9"}} to={`/lostnfound/list/seoulland`}>뒤로가기</Link></BasicButton>

        <BasicButton style={{ marginLeft: '250px' }} size={"small"} shape={"default"} color={"white"} variant={"main"} onClick={handleSubmit}>
          <Link style={{ color:"#fff"}}to={`/lostnfound/list/seoulland`}>
          등록하기
          </Link>
        </BasicButton>

      </S.buttonbox>
    </>
  );
};

export default LostnFoundRegisterSeoulland;
