import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



import logo from '../../assets/logo.svg'
import { Button } from '../../components/Button';


import { Container, LeftContainer, RightContainer, Form, InputContainer, Title } from '../../containers/Login/styles'


export function Login() {

    const schema = yup.object({
        email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
        passaword: yup.string().min(6, " Asenha deve ter pelo menos 6 caracteres").required('Digite uma senha'),
    }).required();


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    console.log(errors) 


    const onSubmit = data => console.log(data);




    return (
        <Container>

            <LeftContainer>

                <img src={logo} alt='logo' />
            </LeftContainer>
            <RightContainer>
                <Title>Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span>Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer >
                        <label>Email</label>
                        <input type='email' {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Senha</label>
                        <input type='passaword' {...register("passaword")} />
                        <p>{errors?.passaword?.message}</p>
                    </InputContainer>
                    <Button type="submit" >ENTRAR</Button>
                </Form>
                <p>Não possui conta? <a>Clique aqui.</a> </p>



            </RightContainer>



        </Container>
    );
}
