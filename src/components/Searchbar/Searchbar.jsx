import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';


export class SearchBar extends Component {
    state = {
        name: '',
    }

    handleChange = evt => {
        this.setState({ name: evt.target.value })
    }

    handleSubmit = evt => {
        evt.preventDefault();
        if (this.state.name.toLowerCase().trim() === '') {
            return alert('You have to enter your request!')
        }
        this.props.onSubmit(this.state.name);
        this.setState({ name: '' });
        this.reset();
    }

    reset() {
        this.setState({ name: '' })
    }

    render() {
        const { state: { name }, handleSubmit, handleChange } = this;
        return (
            <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.searchFormButton}>
                        <span className={css.searchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.searchFormInput}
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
    )
}
}

SearchBar.propTypes = {
    name: PropTypes.string,
}

