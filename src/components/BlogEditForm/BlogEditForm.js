import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, initialValues } from 'redux-form';
import { connect } from 'react-redux';
import blogEditValidation from './blogEditValidation';
import { isSlugExists } from 'redux/modules/blogs';

function asyncValidate(data, dispatch) {
  if (!data.slug) return Promise.resolve();
  return dispatch(isSlugExists(data));
}

@reduxForm({
  form: 'blogEdit',
  validate: blogEditValidation,
  asyncValidate,
  asyncBlurFields: ['title'],
  fields: ['title', 'body', '_id']
})
@connect(
  state => ({
    initialValues: state.blogs.blog
  })
)
export default class BlogEditForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }
  renderInput = ({
    input, label, type, className, styles,
    meta: { touched, error, dirty, active, visited }
  }) =>
    <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
      <label htmlFor={input.name} className="col-sm-2">{label}</label>
      <div className={`col-sm-8 ${styles.inputGroup}`}>
        <input {...input} type={type} className={className} id={input.name} />
        {error && touched && <div className="text-danger">{error}</div>}
        <div className={styles.flags}>
          {dirty && <span className={styles.dirty} title="Dirty">D</span>}
          {active && <span className={styles.active} title="Active">A</span>}
          {visited && <span className={styles.visited} title="Visited">V</span>}
          {touched && <span className={styles.touched} title="Touched">T</span>}
        </div>
      </div>
    </div>;

  renderTextarea = ({
    input, label, type, styles,
    meta: { touched, error, dirty, active, visited }
  }) =>
    <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
      <label htmlFor={input.name} className="col-sm-2">{label}</label>
      <div className={`col-sm-8 ${styles.inputGroup}`}>
        <textarea {...input} type={type} id={input.name} className="form-control"></textarea>
        {error && touched && <div className="text-danger">{error}</div>}
        <div className={styles.flags}>
          {dirty && <span className={styles.dirty} title="Dirty">D</span>}
          {active && <span className={styles.active} title="Active">A</span>}
          {visited && <span className={styles.visited} title="Visited">V</span>}
          {touched && <span className={styles.touched} title="Touched">T</span>}
        </div>
      </div>
    </div>;

  render() {
    const {
      handleSubmit,
      reset
    } = this.props;
    const styles = require('./BlogEditForm.scss');

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <Field name="_id" type="hidden" component="input" />
          <Field name="title" type="text" component={this.renderInput} label="Title"
            className="form-control" styles={styles} {...initialValues} />
          <Field name="body" type="text" component={this.renderTextarea} label="Body"
            className="form-control" styles={styles} {...initialValues} />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane" /> Publish
              </button>
              <button className="btn btn-warning" type="button" onClick={reset} style={{ marginLeft: 15 }}>
                <i className="fa fa-undo" /> Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
