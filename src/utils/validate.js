export default ({ isAuth, values, errors }) => {
    const rules = {
        email: (errors, values) => {
            if (!values.email) {
                errors.email = 'Please Enter Email';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
        },
    
        password: (errors, values) => {
            if (!values.password) {
                errors.password = "Please Input Password";
            } else if (
                !isAuth && !/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
            ) {
                errors.password = isAuth ? "Invalid Password" : "Your password is too easy";
            };
        },
    
        repassword: (errors, values) => {
            if (!values.repassword) {
                errors.repassword = "Please repeat password";
            } else if ( errors.password || values.repassword !== values.password ) {
                errors.repassword = "Passwords doesn't match";
            }
        },

        fullname: (errors, values) => {
            if (!isAuth && !values.fullname) {
                errors.fullname = "Please input your full name";
            }
        }
    }

    Object.keys(values).forEach(key => {
        rules[key] && rules[key](errors, values);
    })
};