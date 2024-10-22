
const getTodoList = gql`
  query Query {
    list {
      content
      id
    }
  }
`

const create = gql`
  mutation Mutation($todoItem: CreateTodoItemInput!) {
    create(todoItem: $todoItem) {
      content
    }
  }
`

type TodoItem = {
  id: number
  content: string
}

import './App.css'
import { gql, useMutation, useQuery } from '@apollo/client'

function App() {
  const { loading, error, data } = useQuery<{
    list: TodoItem[]
  }>(getTodoList)

  const [createTodo] = useMutation(create, {
    refetchQueries: [getTodoList]
  })

  async function handleClick() {
    const text = prompt('新的待办')
    if (text) {
      createTodo({
        variables: {
          todoItem: {
            content: text,
          }
        }
      })
    }
  }

  if (loading) return '正在加载...'
  if (error) return `错误！${error.message}`

  return (
    <>
      <button onClick={handleClick}>新增</button>
      {
        data?.list?.map(i => <li key={i.id}>{i.content}</li>)
      }
    </>
  )
}

export default App
