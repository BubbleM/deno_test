import todos from '../stubs/todos.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import Todo from '../interfaces/Todo.ts';

export default {
  getAllTodos: ({response}:{response: any}) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos
    }
    // 这里不同于Express，不需要return响应对象，Deno会自动为我们执行此操作
  },
  createTodo: async ({request, response}: {request:any, response:any}) => {
    const body = await request.body();
    if(!request.hasBody){
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }
    console.log(body.value);
    let newTodo: Todo = {
      id: v4.generate(),
      todo: body.value.todo,
      isCompleted: false
    }
    console.log(newTodo);
    let data = [...todos, newTodo];
    response.body = {
      success: true,
      data
    }

  },
  getTodoById: ({params, response}: {params: {id: string}, response: any}) => {
    const todo: Todo | undefined = todos.find((t) => {
      return t.id === params.id;
    });
    if(!todo){
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: todo
    };
  },
  updateTodoById: async ({params, request, response}: {params: {id: string}, request: any, response: any}) => {
    const todo: Todo | undefined = todos.find((t) => {
      return t.id === params.id;
    });
    if(!todo){
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }


    const body = await request.body();
    console.log('....');
    console.log(body.value)
    const updateData: { todo?: string; isCompleted?: boolean } = body.value;
    let newTodos = todos.map((t) => {
      return t.id === params.id ? {...t, ...updateData} : t;
    });

    response.status = 200;
    response.body = {
      success: true,
      data: newTodos
    }; 
  },
  deleteTodoById: ({params, response}: {params: {id: string}, response: any}) => {
    const allTodos = todos.filter((t) => t.id !== params.id);

    response.status = 200;
    response.body = {
      success: true,
      data: allTodos,
    };
  }
}