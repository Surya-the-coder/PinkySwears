module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage:{
        'mybg': "url('../assets/images/Ellipse.svg')"
        },
        boxShadow:{
          'forgot-div-password-shadow': '0px 4px 40px #A268AC',
          'email-field-shadow' :'0px 2px 20px #BABABA',
          'button-shadow':'0px 4px 20px 1px #FFBCD1',
          'welcome-field-shadowbefore':'0px 2px 20px #E7E7E7',
          'welcome-field-shadowfocus':'0px 2px 20px #FFBCD1',
          'send-button-shadow':'0px 4px 20px 1px #FFBCD1',
          'card' : '0px 1px 30px rgba(162, 104, 172, 0.81)',
          'navbar' : '0px 1px 30px #E6E6E6;',
        },
        height:{
          'adaptive-screen' : ''
        },
        text:{
          'xxs' : '0.25rem',
        }
    },
  },
  plugins: [],
}