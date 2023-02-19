// import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';
export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    FetchImg(query, page)
      .then(({ hits }) => setItems(prevItems => [...prevItems, ...hits]))
      .finally(() => {
        setLoading(false);
        setVisibleLoadMore(true);
      });
  }, [query, page]);

  const handleLoadMoreBtn = e => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
    setVisibleLoadMore(false);
  };

  const handleSubmitImg = querys => {
    if (query === querys) {
      return;
    }
    setPage(1);
    setQuery(querys);
    setItems([]);
  };
  return (
    <Apps>
      <Searchbar page={page} query={query} onSubmit={handleSubmitImg} />
      {items.length !== 0 && <ImageGallery items={items} />}
      {loading && <Loader />}
      {visibleLoadMore && <Button onClick={handleLoadMoreBtn} />}
    </Apps>
  );
}
// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const storage = localStorage.getItem('contacts');
//     const parsed = JSON.parse(storage);

//     if (parsed) {
//       this.setState({ contacts: parsed });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   onDeleteContactsItem = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(item => item.id !== contactId),
//     }));
//   };

//   onFormSubmitContacts = ({ name, number }) => {
//     const contactItems = {
//       name: name,
//       id: nanoid(),
//       number: number,
//     };
//     const checkName = this.state.contacts.map(({ name }) => {
//       return name;
//     });

//     if (checkName[0] === name) {
//       alert(`${checkName[0]} is already in contacts`);
//     } else {
//       this.setState(prevState => ({
//         contacts: [contactItems, ...prevState.contacts],
//       }));
//     }
//   };

//   onChangeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   render() {
//     console.log(this.state.contacts)
//     const normalizedFiltr = this.state.filter.toLocaleLowerCase();
//     const filterName = this.state.contacts.filter(contact =>
//       contact.name.includes(normalizedFiltr)
//     );
//     const { filter } = this.state;
//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.onFormSubmitContacts} />

//         <h2>Contacts</h2>
//         <Filter value={filter} changeFilter={this.onChangeFilter} />
//         <ContactList
//           contacts={filterName}
//           deleteContact={this.onDeleteContactsItem}
//         />
//       </div>
//     );
//   }
// }
