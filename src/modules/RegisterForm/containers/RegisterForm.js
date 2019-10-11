
import { withFormik } from "formik";

import RegisterForm from '../components/RegisterForm';
import validateForm from 'utils/validate';
import store from 'redux/store';
import { userActions } from 'redux/actions';
import { openNotification } from 'utils/helpers';


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
        store.dispatch(
            userActions
            .fetchUserRegister(values)
        )
            .then(({ data }) => {
                if (data.status === 'success') {
                    props.history.push('/register/verify');
                }
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false)
                openNotification({
                    text: 'Such user exists',
                    type: 'error',
                    title: 'Error',
                })
            })
    },
    displayName: 'RegisterForm',
})(RegisterForm);