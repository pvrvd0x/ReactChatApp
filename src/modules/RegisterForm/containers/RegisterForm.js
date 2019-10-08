import { withFormik } from "formik";

import RegisterForm from '../components/RegisterForm';
import validateForm from 'utils/validate';
import store from 'redux/store';
import { userActions } from 'redux/actions';

export default withFormik({
    mapPropsToValues: () => ({
        fullname: '',
        email: '',
        password: '',
        repassword: '',
    }),
    validate: values => {
        let errors = {};

        validateForm({ isAuth : false, values: values, errors: errors });

        return errors;
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        store.dispatch(userActions
            .fetchUserRegister(values))
            .then(({ status }) => {
                if (status === 'success') {
                    props.history.push('/register/verify');
                }
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false)
            });
    },
    displayName: 'RegisterForm',
})(RegisterForm);