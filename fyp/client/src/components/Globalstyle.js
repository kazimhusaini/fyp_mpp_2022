import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle
  `
    body
    {
      background:${({ theme }) => theme.body} ;
      color: ${({ theme }) => theme.text} !important;
      transition: all 0.50s linear;
      .MuiSvgIcon-root{
      color: ${({ theme }) => theme.text} !important;
     c
      }
      .sidebar .MuiSvgIcon-root{
        color: rgb(209,213,219) !important ;
      transition: all 0.50s linear;
      }
      .singlePostTitle , .postDetailItem{
      color: ${({ theme }) => theme.btnColor} !important;
      font-weight:800
      transition: all 0.50s linear;

      }
      .singlePostDesc , .singlePostInfo{
        color: ${({ theme }) => theme.text} !important;
      transition: all 0.50s linear;

      }
      .singlePostInfo .link{
      color: ${({ theme }) => theme.btnColor} !important;
      transition: all 0.50s linear;
      

      }
      .uploadImg{
        background:${({ theme }) => theme.body} !important;
        border-color: ${({ theme }) => theme.btnColor} !important;
        transition: all 0.50s linear;
      }       
      .uploadImg .uploadIcon{
        color: ${({ theme }) => theme.btnColor} !important;
        transition: all 0.50s linear;
      }
      .css-jvd2ob {
        background:${({ theme }) => theme.body} ;
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .appBarc{
        background:${({ theme }) => theme.bodyColor2} !important;
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .logoTitle {
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .makeStyles-root1-21 {
        // box-shadow: ${({ theme }) => theme.whiteShadow} !important;
        background:${({ theme }) => theme.bodyColor2} ;
        transition: all 0.50s linear;
      }
      .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root {
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline{
        border-color: ${({ theme }) => theme.btnColor} !important;
        transition: all 0.50s linear;
      }
      .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input:focus {
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .css-1x51dt5-MuiInputBase-input-MuiInput-input{
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .Mui-focused {
        color: ${({ theme }) => theme.text} !important;
      }  
      .css-i4bv87-MuiSvgIcon-root{
        // color: ${({ theme }) => theme.text} !important;s
      }
      .MuiToggleButton-root{
        border-color: ${({ theme }) => theme.btnColor} !important;
        color: ${({ theme }) => theme.text} !important;
      }
      .MuiToggleButton-root.Mui-selected{
        color: ${({ theme }) => theme.darkTextColor} !important;
        background-color:${({ theme }) => theme.btnColor}  !important;
      }
      .sidebar{
        background:${({ theme }) => theme.body} ;
        transition: all 0.50s linear;
      }
      .sidebar .top .logo {
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .css-gadse4-MuiPaper-root-MuiGrid-root{
        background:${({ theme }) => theme.body} ;
        transition: all 0.50s linear;
      }
      .MuiFilledInput-input{
        background:${({ theme }) => theme.body} ;
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input{
        color: ${({ theme }) => theme.text} !important;
      }
      .makeStyles-root-5 .uploadImg2{
        background:${({ theme }) => theme.fetchImg} !important;
        transition: all 0.50s linear;
      }
      .css-ag7rrr-MuiTypography-root{
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .MuiButton-root{
        background:${({ theme }) => theme.btnColor} !important;;
        color: ${({ theme }) => theme.darkTextColor} !important;
        transition: all 0.50s linear;
      }
      .MuiButton-outlined{
        color: ${({ theme }) => theme.text} !important;
        background-color:${({ theme }) => theme.bodyColor2}  !important;
        border-color:${({ theme }) => theme.btnColor}  !important;
      }
      .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
        border-color: #d32f2f !important;
      }
      .css-1vhaqj4-MuiButtonBase-root-MuiButton-root.Mui-disabled {
        background: ${({ theme }) => theme.text} !important;
        opacity: 0.1;
      }
      .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled{
        -webkit-text-fill-color: ${({ theme }) => theme.disableText} !important;
      }
      .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input{
        color: ${({ theme }) => theme.text} !important;
      }
      .MuiFormLabel-root.Mui-disabled{
        color: ${({ theme }) => theme.text} !important;
      }
      .css-k78a2-MuiPaper-root-MuiCard-root{
        background:${({ theme }) => theme.bodyColor2} !important;;
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
        // box-shadow:${({ theme }) => theme.whiteShadow} !important;
      }
      .name,
      .desc{
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .singlePostWrapper{
        background:${({ theme }) => theme.bodyColor2} !important;;
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
        // border:1px solid  ${({ theme }) => theme.btnColor} !important;
      }
      .textAreaG{
        background:${({ theme }) => theme.body} !important;
        color: ${({ theme }) => theme.text} !important;
        border-color:${({ theme }) => theme.btnColor}  !important;
        transition: all 0.50s linear;
      }
      .MuiFormLabel-root{
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select{
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input {
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .navbar {
        background:${({ theme }) => theme.bodyColor2} !important;
        transition: all 0.50s linear;
      }
      .user-card{
        background:${({ theme }) => theme.bodyColor2} !important;
        transition: all 0.50s linear;
      }
      .YourPostForm{
        background:${({ theme }) => theme.main} !important;
        transition: all 0.50s linear;
      }
      .css-1t1j96h-MuiPaper-root-MuiDialog-paper{
        background:${({ theme }) => theme.bodyColor2} !important;
        transition: all 0.50s linear;
      }
      .css-bdhsul-MuiTypography-root-MuiDialogTitle-root{
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
        font-size:18px;
      }
      .MuiDialogContentText-root{
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
        font-size:16px;
      }
      .cPanelContent,.imageContentHolder{
        background:${({ theme }) => theme.bodyColor2} !important;
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .cPanelContent  ul {
        margin:0;
        padding:0;
      }
      .cPanelContent  ul li{
        margin:0;
        padding:0;
      }
      .cPanelContent h5 ,.cPanelContent  ul li,.cPanelContent  p{
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .cPanelContent:hover h5 ,.cPanelContent:hover  ul li,.cPanelContent:hover p{
        color: ${({ theme }) => theme.text} !important;
      }
      .cPanelContent .cPanelSection:hover{
        background:${({ theme }) => theme.btnTextb} !important;

      }
      
      .cont{
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .contacts{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .brand{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .current-user{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .chat-header{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important; 
      }
      .chat-messages{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important; 
      }
      .typeText{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .welCome{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .chatCont{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .contacts .contact{
        background:${({ theme }) => theme.itembg} !important;
      }
      .chatContainerr{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .input-container {
        background:${({ theme }) => theme.bodyColor2} !important;
      }
      .input-container input{
        background:${({ theme }) => theme.bodyColor2} !important;
        border-color:${({ theme }) => theme.btnColor} !important;
      }
      .filterForm{
        background:${({ theme }) => theme.bodyColor2} !important;
        // color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear;
      }
      .MainPageSideBar .MuiPaper-root{
        background:${({ theme }) => theme.bodyColor2} !important;
        transition: all 0.50s linear;
        color: ${({ theme }) => theme.text} !important;
      }
      .active .MuiSvgIcon-root, .active .sideText{
        color:rgb(16, 185, 129) !important;
      }
      .navText{
        transition: all 0.50s linear;
        color: ${({ theme }) => theme.text} !important;
      }
    }
  `