import * as Yup from 'yup'

const FormEditFormsWeb = Yup.object().shape({
  proposta: Yup.string()
    .required('Informe a Proposta!')
    .max(12, 'Cod Proposta Inválida!')
    .matches(/^[0-9]+$/, 'Digite apenas números!'),
  banco: Yup.string().required('Informe o Banco!'),
  dataRetorno: Yup.string().required('Informe a Data de Retorno!'),
  horaRetorno: Yup.string().required('Informe a Hora!')
})

export default FormEditFormsWeb
