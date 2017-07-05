import React from 'react'
import { Form, Input } from 'semantic-ui-react'


export class FormField extends React.Component {

  handleFieldChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {

      const { minLength, stateName } = this.props

      var fieldValue = event.target.value
      var fieldLengthOK = fieldValue.length >= minLength

      var update = JSON.parse(`{"${stateName}": "${fieldValue}", "${stateName}LengthOK": ${fieldLengthOK}}`)
      this.props.updateFieldState(update)
    }
  }

  getDescription = () => {
    const { label, minLength } = this.props

    var description = `Please specify your ${label.toLowerCase()}`
    if(minLength > 1) {
      description += `, at least ${minLength} characters.`
    }
    return description
  }

  render () {
    const { label, placeholder, fieldValue, fieldLengthOK, type } = this.props

    return (
      <Form.Field>
        <label>{label}:</label>
        <Input onChange={this.handleFieldChanged} placeholder={placeholder} value={fieldValue} type={type} />
        {fieldLengthOK ? null : <p className='formDescription'>{this.getDescription()}</p>}
      </Form.Field>
    )
  }

}
