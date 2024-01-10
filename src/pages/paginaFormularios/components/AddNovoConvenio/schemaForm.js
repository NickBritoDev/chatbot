import * as Yup from 'yup'

const FormEditFormsWeb = Yup.object().shape({
  nome: Yup.string().required('Informe o nome do Convênio!'),
  banco: Yup.string().required('Informe o Banco!')
})

export default FormEditFormsWeb
