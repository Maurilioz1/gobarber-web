import React, { useCallback, useRef } from 'react';
import { FiUserPlus, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, AnimationContainer, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const { email, password } = data;

                await signIn({
                    email,
                    password,
                });

                history.push('/');
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error);

                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro de autenticação',
                    description:
                        'Ocorreu um erro ao tentar fazer login, verifique se as credenciais estão corretas.',
                });
            }
        },
        [signIn, addToast, history],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="logo GoBarber" />

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <h1>Faça seu logon</h1>

                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />

                        <Button type="submit">Entrar</Button>

                        <Link to="password/forgot">Esqueci minha senha</Link>
                    </Form>

                    <Link to="registrar">
                        <FiUserPlus />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
};

export default SignIn;
