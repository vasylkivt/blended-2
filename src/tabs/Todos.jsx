import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, Text, Todo } from 'components';

//EditForm

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
      this.setState({ todos });
    }
  }

  componentDidUpdate(_, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  addTodo = text => {
    const todo = { id: nanoid(), text };
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  handleSubmit = data => {
    this.addTodo(data);
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />

        {todos.length === 0 && (
          <Text textAlign="center">There are no any todos ... </Text>
        )}
        <Grid>
          {todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                id={id}
                text={text}
                counter={index + 1}
                onClick={this.deleteTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
