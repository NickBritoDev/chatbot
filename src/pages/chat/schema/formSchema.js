import * as Yup from 'yup'

const formValidationSchema = Yup.object().shape({
  usuario: Yup.string()
    .required('O campo usuário é obrigatório*')
    .matches(/^\w+\.\w+$/, 'O campo usuário deve estar no formato:\nexemplo.usuario'),
  senha: Yup.string()
    .required('O campo senha é obrigatório*')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
})

export default formValidationSchema
