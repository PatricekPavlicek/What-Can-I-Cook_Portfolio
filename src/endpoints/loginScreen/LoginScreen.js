import React, {useState} from 'react';
import styles from './LoginScreen.module.css';
import { useNavigate } from 'react-router-dom';

import KitchenImage from '../../resources/kitchen.png';
import UserImage from '../../resources/user.png';
import GoogleImage from '../../resources/google.png';
import FacebookImage from '../../resources/facebook.png';

import LoginInput from '../../components/loginInput/LoginInput.js';
import Button from '../../components/button/Button.js';
import SecondaryLoginButton from '../../components/secondaryLoginbutton/SecondaryLoginButton.js';
import LinkReference from '../../components/linkReference/LinkReference.js';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.js';

function LoginScreen(){

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginButtonClick = () => {
        if(!checkValidLogin()) return;

        alert('logging in');
    }

    const checkValidLogin = () => {
        setError('');

        if(email.trim() === ''){
            setError('Musí být zadán email');
            return false;
        }

        // Valid email regex
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError('Email není platný');
            return false;
          }

        if(password.trim() === ''){
            setError('Musí být zadáno heslo');
            return false;
        }

        return true;
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['window']}>
                <img className={styles['main-image']} src={KitchenImage} alt="kitchen"></img>
                <div className={styles['input-section']}>
                    <div className={styles['input-section-heading']}>
                        <h2 className={styles['input-section-heading-text']}>Přihlášení</h2>
                        <img className={styles['input-section-heading-icon']} src={UserImage} alt="user"></img>
                    </div>
                    <div className={styles['primary-login']}>
                        <LoginInput
                            id="email"
                            type="email"
                            labelText="Email"
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <LoginInput
                            id="password"
                            type="password"
                            labelText="Heslo"
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                        <ErrorMessage errorText={error}></ErrorMessage>
                        <Button className={styles['primary-login-button']} color="var(--orange)" text="Přihlásit" width="50%" onClick={loginButtonClick}></Button>
                    </div>
                    <div className={styles['secondary-login']}>
                        <div className={styles['secondary-login-separator']}>
                            <div className={styles['secondary-login-rectangle']}></div>
                            <p className={styles['secondary-login-separator-text']}>Nebo přihlásit pomocí</p>
                            <div className={styles['secondary-login-rectangle']}></div>
                        </div>
                        <SecondaryLoginButton id="google-login" image={GoogleImage} text="Přihlásit přes účet Google"></SecondaryLoginButton>
                        <SecondaryLoginButton id="facebook-login" image={FacebookImage} text="Přihlásit přes účet Facebook"></SecondaryLoginButton>
                        <p className={styles['bottom-text']}>Ještě nemáte účet? <span><LinkReference to="/register" text="Registrovat"></LinkReference></span></p>
                        <p className={styles['bottom-text']}>Zapomněli jste heslo? <span><LinkReference text="Resetovat heslo"></LinkReference></span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;