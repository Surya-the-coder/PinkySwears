module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor:{
        'bg-mybg':'linear-gradient(180deg, #FFBCD1 0%, #FDEBF7 100%)',
        },
        boxShadow:
        {
          'forgot-div-password-shadow': '0px 4px 40px #A268AC',
          'email-field-shadow' :'0px 2px 20px #BABABA',
          'send-button-shadow':'0px 4px 20px 1px #FFBCD1'
        }
    },
  },
  plugins: [],
}