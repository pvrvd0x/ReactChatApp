export default ({ isAuth, values, errors }) => {
    const rules = {
        email: (errors, values) => {
            console.log(values.email);
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
                !/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
            ) {
                errors.password = isAuth ? "Invalid Password" : "Your password is too easy";
            };
        },
    
        repassword: (errors, values) => {
            if (!values.repassword) {
                errors.repassword = "Please repeat password";
            } else if ( errors.password ) {
                errors.repassword = "Please, provide appropriate password password";
            } else if (
                values.repassword !== values.password
            ) {
                errors.repassword = "Passwords doesn't match";
            };
        }
    }

    Object.keys(values).forEach(key => {
        rules[key] && rules[key](errors, values);
    })
};