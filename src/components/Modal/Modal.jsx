import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
        closeByEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
    };
    componentDidMount() {
    window.addEventListener('keydown', this.closeByEscape);
    }
    closeByBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
    };
    componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEscape);
    }
    render() {
        return (
            <div className={css.overlay} onClick={this.closeByBackdrop}>
                <div className={css.modal}>
                    <img src={this.props.src} alt={this.props.alt} />
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
  };