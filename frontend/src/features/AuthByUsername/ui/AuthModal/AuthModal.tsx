import {memo, useState} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Modal} from "@/shared/ui/Modal/Modal";
import {LoginForm} from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {useDispatch} from "react-redux";
import {registerActions} from "../../modelRegister/slice/registerSlice";
import {loginActions} from "../../modelLogin/slice/loginSlice";
import cls from "./AuthModal.module.scss";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

enum AuthMode {
    register = 'register',
    login = 'login'
}

export const AuthModal = memo(
    ({ className = "", isOpen, onClose }: LoginModalProps) => {
        const [mode, setMode] = useState<AuthMode>(AuthMode.login);

        const dispatch = useDispatch();

        const toggleMode = () => {
            dispatch(loginActions.clearForm());
            dispatch(registerActions.clearForm());
            setMode(mode === AuthMode.login ? AuthMode.register : AuthMode.login);
        };

        return (
            <Modal
                className={classNames("", {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
                lazy

            >
                <div className={cls.authModalContent}>
                <Button theme={ButtonTheme.OUTLINE} onClick={toggleMode}>
                    ⇆
                </Button>
                {mode === AuthMode.login ? <LoginForm /> : <RegisterForm />}
                </div>
            </Modal>
        );
    }
);
