import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
    return (
        <button
            type='button'
            className={css.button}
            onClick={onLoadMore}>
            Load more
        </button>
    )
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
}

