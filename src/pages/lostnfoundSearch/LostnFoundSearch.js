import React, { useState, useEffect } from 'react';
import BasicButton from '../../components/button/BasicButton.jsx';
import { Link, useParams } from 'react-router-dom';
import S from './style.js';

const LostnFoundSearch = () => {
  const { id, company } = useParams();
  const [lostnfoundlist, setLostList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:8010/lostnfoundlist/list/all/')
      .then((res) => res.json())
      .then((data) => {
        const filteredList = data.lostnfoundlist.filter(item => {
          return parseInt(item.no) === parseInt(id) && item.company.trim() === company.trim();
        });
        

        setLostList(filteredList);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id, company]); 

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleRegisterClick = () => {
    const updatedList = lostnfoundlist.map(item => {
      if (parseInt(item.no) === parseInt(id) && item.company.trim() === company.trim()) {
        return {
          ...item,
          result: "처리중"
        };
      } else {
        return item;
      }
    });
    setLostList(updatedList);


    fetch(`http://localhost:8010/lostnfoundlist/post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        result: '처리중'
      })
    })
    .then(response => response.json())
    alert("분실물 찾기 신청이 완료되었습니다.");
  };

  function addSevenDays(dateString) {

    const originalDate = new Date(dateString);
    

    const newDate = new Date(originalDate);
    newDate.setDate(newDate.getDate() + 7);

    const year = newDate.getFullYear();
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const day = ("0" + newDate.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }


  return (
    <>
      <div style={{marginTop:'100px'}}></div>
      <S.header>
        <h1>분실물 찾기</h1>
      </S.header>

      <S.container>
        <S.titlebox>
          <div>
            <p>이름 :<S.StyledInput style={{marginLeft:"30px",width:"400px", height:"40px"}}type='text' /></p>
            <p>연락처 : <S.StyledInput style={{marginRight:"15px",marginLeft:"30px",width:"110px", height:"40px"}} type='text' />
            - <S.StyledInput style={{marginLeft:"15px",marginRight:"15px",width:"110px", height:"40px"}} type='text' /> - 
              <S.StyledInput style={{marginLeft:"15px",width:"110px", height:"40px"}} type='text' /></p> 

              {lostnfoundlist.map(item => {
              const startDate = item.date;
              const endDate = addSevenDays(startDate);
              
                return (
                  <div key={item._id}>
                    <p>찾는 물건 : {item.item}</p>
                    <p>수령 가능 기간 : {startDate} ~ {endDate}</p>
                  </div>
                        );
                      })}
            </div>
        </S.titlebox>
        
        <S.contentbox>
          <S.ptitle>분실물이 본인의 것이 아닌 경우 법적 책임은 지지 않습니다.</S.ptitle>
          <p>점유자를 기망하여 분실물을 취득한 행위는 사기죄에 해당하므로 법적 처벌을 받게 됩니다. 
          사기죄의 법정형은 10년 이하의 징역 또는 2천만원 이하의 벌금이 발생합니다.
          형법 제360조(점유이탈물횡령) ① 유실물, 표류물 또는 타인의 점유를 이탈한 재물을 횡령한 자는 1년 이하의 징역이나 300만원 이하의 벌금 또는 과료에 처한다. 
          </p>
          <S.ptitle>분실물은 현장에서 직접 수령해야 합니다.</S.ptitle>
          <p>분실물 찾기 신청인은 본인을 증명할 수 있는 신분증(운전 면허증, 여권, 학생증 등 ) 또는 서류를 준비해주시길 바랍니다.</p>
          <S.ptitle>분실물 찾아가기 신청 후 1주일 내에 방문해 찾아가야 합니다.</S.ptitle>
          <p>분실물 신청 후 1주일 동안 “처리중” 상태가 되며, 기간 내 수령하지 않을 시 다시 “보관 중” 상태로 변경됩니다.</p>
          <p>
            <input type='checkbox' onChange={handleCheckboxChange} /> 위 내용을 모두 확인하였습니다. (필수)
          </p>
        </S.contentbox>

        <div style={{marginTop:"50px"}}>
          <BasicButton style={{ backgroundColor: "white", color: "#1FB1D9", border: "1px solid #1FB1D9" }}
            size={"small"} shape={"default"} color={"white"} variant={"main"}>
            <Link style={{ color:"#1FB1D9"}} to={`/lostnfound/list/lotteworld`}>뒤로가기</Link>
          </BasicButton>

          <BasicButton style={{ marginLeft: '250px' }} size={"small"} shape={"default"} color={"white"} variant={"main"} onClick={handleRegisterClick}>
            <Link style={{ color:"#fff"}}to={`/lostnfound/list/lotteworld`}>
              등록하기
            </Link>
          </BasicButton>
        </div>
      </S.container>
    </>
  );
};

export default LostnFoundSearch;
