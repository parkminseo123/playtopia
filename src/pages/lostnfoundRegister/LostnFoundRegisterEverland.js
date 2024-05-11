import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import S from './style.js';
import BasicButton from '../../components/button/BasicButton.jsx';

const LostnFoundRegisterEverland = () => {
  const [lostneverland, setLostnEverland] = useState({
    item: '',
    found: '',
    content: '',
    no: null,
    result: "보관중",
    date: new Date().toISOString(),
    company: "everland"
  });

  useEffect(() => {
    fetch('http://localhost:8010/lostnfoundlist/list/')
      .then((res) => res.json())
      .then((data) => {
        setLostnEverland((prev) => ({
          ...prev,
          no: data.no + 1, 
          date: data.date, 
        }));
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:8010/lostnfoundexplain/list/')
      .then((res) => res.json())
      .then((data) => {
        setLostnEverland((prev) => ({
          ...prev,
          no: data.no + 1, 
          date: data.date, 
        }));
      })
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLostnEverland({ ...lostneverland, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8010/lostnfoundexplain/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...lostneverland,
        date: new Date().toISOString(), 
      }),
    })
    .then((res) => {
      return res.json();
    })

    fetch('http://localhost:8010/lostnfoundlist/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...lostneverland,
        date: new Date().toISOString(), 
      }),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setLostnEverland((prevState) => ({
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
      <S.margin></S.margin>
      <S.head>
      <S.header>
      <h1>분실물 센터</h1>
      
      </S.header>
        <S.title>
          <Link to={"/lostnfound/register/lotteworld"}><S.lotteworld>롯데월드</S.lotteworld></Link>
          <S.everland color='#1FB1D9' >에버랜드</S.everland >
          <Link to={"/lostnfound/register/seoulland"}><S.seoulland>서울랜드</S.seoulland></Link>
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
          <S.StyledInput type='text' name='item' placeholder="종류" value={lostneverland.item} onChange={handleChange} />
          <S.StyledInput style={{ marginLeft: '250px' }} type='text' name='found' placeholder="장소" value={lostneverland.found} onChange={handleChange} />
        </S.inputbox>
      </div>

      <div>
        <S.subtitle>
          <p>내용 </p><S.subp style={{ marginRight: '540px' }}>(필수 항목)</S.subp>
        </S.subtitle>

        <S.inputbox>
          <S.StyledInput style={{ width: '850px', height: '300px' }} type="text" name="content" placeholder="내용을 입력해주세요" value={lostneverland.content} onChange={handleChange} />
        </S.inputbox>
      </div>

      <S.buttonbox>

        
          <BasicButton style={{ backgroundColor: "white", color: "#1FB1D9", border: "1px solid #1FB1D9" }}
            size={"small"} shape={"default"} color={"white"} variant={"main"}>
              <Link style={{ color:"#1FB1D9"}} to={`/lostnfound/list/everland`}>
                뒤로가기
                </Link>
          </BasicButton>
       

        <BasicButton style={{ marginLeft: '250px' }} size={"small"} shape={"default"} color={"white"} variant={"main"} onClick={handleSubmit}>
        <Link style={{ color:"#fff"}} to={`/lostnfound/list/everland`}>
          등록하기
          </Link>
        </BasicButton>

      </S.buttonbox>
    </>
  );
};

export default LostnFoundRegisterEverland;