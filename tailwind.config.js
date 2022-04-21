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
        boxShadow:
        {
          'forgot-div-password-shadow': '0px 4px 40px #A268AC',
          'email-field-shadow' :'0px 2px 20px #BABABA',
          'button-shadow':'0px 4px 20px 1px #FFBCD1',
          'welcome-field-shadowbefore':'0px 2px 20px #E7E7E7',
          'welcome-field-shadowfocus':'0px 2px 20px #FFBCD1',
        }
    },
  },
  plugins: [],
}