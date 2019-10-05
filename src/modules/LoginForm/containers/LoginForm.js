import { withFormik } from 'formik';

import store from 'redux/store';
import validateForm from 'utils/validate';
import LoginForm from '../components/LoginForm';
import { userActions } from '../../../redux/actions';


const LoginFormContainer = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validate: values => {
        let errors = {};

        validateForm({ isAuth: true, values: values, errors: errors});

        return errors;
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        store.dispatch(userActions
            .fetchUserLogin(values))
            .then(({ status }) => {
                if (status === 'success') {
                    props.history.push('/');
                }
                setSubmitting(false);
            })
    },
    displayName: 'LoginForm',
})(LoginForm);

export default LoginFormContainer;