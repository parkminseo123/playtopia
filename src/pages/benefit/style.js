import styled from "styled-components";

const S ={};

const mainSoftColor = ({theme}) => theme.PALETTE.primary.main_soft;
const mainLightenColor = ({theme}) => theme.PALETTE.primary.main_lighten;
const mainColor = ({theme}) => theme.PALETTE.primary.main;
const mainDarkenColor = ({theme}) => theme.PALETTE.primary.main_darken;
const subColor = ({theme}) => theme.PALETTE.sub.sub;
const fontRegular = ({theme}) => theme.FONT_WEIGHT.regular;
const fontSemiBold = ({theme}) => theme.FONT_WEIGHT.semibold;
const fontBold = ({theme}) => theme.FONT_WEIGHT.bold;
const searchBarBorder = '0.2rem';
const h1FontSize = "40px";
const basicFontSize = '0.9rem';

S.Container = styled.div`
	width: 90%;
	margin: 0 auto;
`;

S.Header1 = styled.h1`
	margin: 100px auto 10px auto;
	font-size: ${h1FontSize};
	text-align: center;
	width: 100%;
	font-weight: ${fontBold};
	@media (max-width: 727px) {
		margin: 80px auto 10px auto;
		font-size: 35px;
	}
`;

S.NavParkSelector = styled.nav`
	font-size: 1rem;
	width: 100%;
	text-align: center;
	margin: 30px auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	& * {
		margin: 0 0.5rem;
		color: #000;
	}
	& *:hover {
		color: ${mainDarkenColor};
		font-weight: 500;
	}
	& .active {
		color: ${mainColor};
		font-weight: 600;
	}
	@media (max-width: 727px){
		font-size: 0.9rem;
	}
`;

S.NavTypeSelector = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr) ;
	grid-auto-rows: minmax(3rem, auto);
	column-gap: 1rem;
	background-color: ${mainSoftColor};
	padding: 0 2rem;
	@media (max-width: 727px){
		column-gap: 0.5rem;
		padding-top: 0.3rem;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: minmax(3rem, auto);
	}
`;

S.BtnTypeSelector = styled.button`
	font-size: 0.9rem;
	border: none;
	background-color: ${mainSoftColor};
	border-radius: 1rem;
	padding: 0 1rem;
	cursor: pointer;
	&:hover{
		background-color: ${mainLightenColor};
	}
	&.active{
		background-color: ${mainColor};
		color: #ffffff;
	}
	@media (max-width: 727px) {
		padding: 0 0.5rem;
		font-size: 0.8rem;
	}
`;

S.SearchWrapper = styled.div`
	padding: 0;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	margin: 0.5rem auto;
	grid-column: 5 / 7;
	@media (max-width: 727px){
		grid-column: 1 / 5;
	}
`;

S.SearchInput = styled.input`
	height: 100%;
	background-color: #fff;
	border-color: ${mainColor};
	border-style: solid;
	border-width: ${searchBarBorder} 0 ${searchBarBorder} ${searchBarBorder};
	border-radius: 30px 0 0 30px;
	outline: none;
	padding-left: 1rem;
	font-size: ${basicFontSize};
`;

S.SearchBtn = styled.button`
	height: 100%;
	background-color: #fff;
	border-color: ${mainColor};
	border-style: solid;
	border-width: ${searchBarBorder} ${searchBarBorder} ${searchBarBorder} 0;
	border-radius: 0 30px 30px 0;
	cursor: pointer;
`;

S.OrderSelector = styled.div`
	font-size: ${basicFontSize};
	margin: 20px 30px;
	@media (max-width: 727px) {
		margin: 10px 20px;
	}
`;

S.OrderBtn = styled.button`
	border: none;
	background: none;	
	font-size: ${basicFontSize};
	cursor: pointer;
	&.active{
		color: ${mainColor};
		font-weight: ${fontBold};
	}
`;

S.GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 20%);
	grid-auto-rows: minmax(18rem, auto);
	gap: 2vw;
	justify-content: space-between;
	margin-bottom: 4rem;
	@media (max-width: 727px){
		grid-template-columns: repeat(2, 48%);
		grid-auto-rows: minmax(15rem, auto);
	}
`;

S.GridItem = styled.div`
	background-color: #fff;
	border-color: ${mainColor};
	border-style: solid;
	border-radius: 30px;
	border-width: 1px;
	font-size: 0.9rem;
	padding: 1.2rem;
	color: #000;
	height: 100%;
	cursor: pointer;
	line-height: 1.2rem;
	&:hover{
		box-shadow: 0 0 10px 2px ${mainLightenColor};
	}
	@media (max-width: 727px){
		font-size: 0.7rem;	
		padding: 1rem;
		line-height: 1.5rem;
	}
`;

S.ItemPeriod = styled.p`
	padding-top: 0.4rem;
`;

S.ItemTitle = styled.p`
	font-size: 1rem;
	padding: 0.5rem 0;
	font-weight: ${fontBold};
	width: 100%;
	line-height: 1.2rem;
	@media (max-width: 727px) {
		font-size: 0.9rem;
	}
`;

S.ItemPrice = styled.span`
	font-weight: ${fontSemiBold};
	color: ${subColor};
	@media (max-width: 727px) {
		font-size: 0.9rem;
	}
`;

S.ItemImgWrapper = styled.div`
	width: 100%;
	text-align: center;
	height: 10rem;
	justify-content: center;
	background-image: url(${(props) => props.imgSrc});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	@media (max-width: 727px){
		height: 9rem;
	}
`;

export default S;