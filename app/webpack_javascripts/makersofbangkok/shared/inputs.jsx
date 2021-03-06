import React from 'react';
import classNames from 'classnames';

export const ErrorCheck = function(array, attr) {
  return (array && array[attr]);
};

export const TextInput = React.createClass({
  render() {
    let link = this.props.valueLink(this.props.attr);
    let errorFound = ErrorCheck(this.props.errors, this.props.attr);
    if (this.props.label) {
      var inputLabel =
        <label className="label-class" htmlFor={this.props.id}>
          {this.props.label}
        </label>;
    }
    return <div className={classNames('form-group',
                                      { 'has-error': errorFound })}>
      {inputLabel}
      <input className={classNames('form-control', this.props.extraClassNames)}
        type={this.props.type} placeholder={this.props.placeholder}
        name={this.props.name} id={this.props.id}
        valueLink={link} />
      <ErrorHint for={this.props.id} attr={this.props.attr}
        errors={this.props.errors} />
    </div>;
  }
});

export const TextInputWithButton = React.createClass({
  render() {
    let link = this.props.valueLink(this.props.attr);
    let errorFound = ErrorCheck(this.props.errors, this.props.attr);
    if (this.props.label) {
      var inputLabel =
        <label className="label-class" htmlFor={this.props.id}>
          {this.props.label}
        </label>;
    }
    return <div className={classNames('form-group',
                                      { 'has-error': errorFound })}>
      {inputLabel}
      <div className="input-group">
        <input
          className={classNames('form-control', this.props.extraClassNames)}
          type={this.props.type} placeholder={this.props.placeholder}
          name={this.props.name} id={this.props.id}
          valueLink={link} />
        <span className="input-group-btn">
          {this.props.buttonAfter}
        </span>
      </div>
      <ErrorHint for={this.props.id} attr={this.props.attr}
        errors={this.props.errors} />
    </div>;
  }
});

const ErrorHint = React.createClass({
  render() {
    let errorFound = ErrorCheck(this.props.errors, this.props.attr);
    let errorMessage;
    if (errorFound) {
      errorMessage = this.props.errors[this.props.attr][0];
    } else {
      errorMessage = this.props.statusMsg;
    }

    return <span id={`${this.props.for}-errors`} className='help-block'>
      {errorMessage}
    </span>;
  }
});
