import * as Yup from 'yup'

const FormEditFormsWeb = Yup.object().shape({
  motivoSolicitacao: Yup.string().required('Informe o motivo!'),
  proposta: Yup.string()
    .required('Informe a Proposta!')
    .max(12, 'Cod Proposta Inválida!')
    .matches(/^[0-9]+$/, 'Digite apenas números!'),
  banco: Yup.string().required('Informe o Banco!'),
  cpf: Yup.string()
    .required('Informe o CPF!')
})

export default FormEditFormsWeb
