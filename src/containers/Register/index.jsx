import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api.js'
import { toast } from "react-toastify";

import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/index.jsx';
import { Container, LeftContainer, RightContainer, Form, InputContainer, Title } from './styles.js';

export function Register() {
    const schema = yup.object({
        name: yup.string().required('O nome é Obrigatório'),
        email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
        password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required('Digite uma senha'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirma sua senha'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = async (data) => {

        try {
            const { status } = await
                api.post('/users', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
                    {
                        validateStatus: () => true,
                    }
                )

            if (status === 200 || status === 201) {
                toast.success('Conta criada com sucesso!')
            } else if (status === 409) {
                toast.error('Email já cadastrado! Faça login para continuar')
            } else {
                throw new Error()
            }

        } catch (error) {
            toast.error('Falha no Sistema! Tente novamnete')
        }

    }

    return (
        <Container>
            <LeftContainer>
                <img src={logo} alt='logo' />
            </LeftContainer>
            <RightContainer>
                <Title>Criar Conta
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Nome</label>
                        <input type='text' {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Email</label>
                        <input type='email' {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Senha</label>
                        <input type='password' {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Confirmar Senha</label>
                        <input type='password' {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>
                    <Button type="submit">Criar Conta</Button>
                </Form>
                <p>Já possui conta? <a href="#">Clique aqui.</a></p>
            </RightContainer>
        </Container>
    );

}