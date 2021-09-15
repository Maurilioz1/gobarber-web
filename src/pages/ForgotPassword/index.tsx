import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, AnimationContainer, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            setLoading(true);

            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const { email } = data;

                // Recuperação de senha
                await api.post('/password/forgot', {
                    email,
                });

                addToast({
                    type: 'success',
                    title: 'E-mail de recuperação enviado',
                    description: 'Cheque sua caixa de entrada.',
                });
                // history.push('/');
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error);

                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro na recuperação de senha',
                    description:
                        'Tente novamente ou verifique se o e-mail está correto.',
                });
            } finally {
                setLoading(false);
            }
        },
        [addToast],
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
                        <h1>Recuperar senha</h1>

                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />

                        <Button loading={loading} type="submit">
                            Recuperar
                        </Button>
                    </Form>

                    <Link to="login">
                        <FiArrowLeft />
                        Voltar para logon
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
};

export default ForgotPassword;
