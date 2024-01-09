
const express = require('express')
const { checkSchema } = require('express-validator');

const app = express()
app.use(express.json())
const port = 3000

let todos = {
  "1": {
    name: "default",
    message: "default message"
  }
};

app.get('/todo/all', (req, res) => {
  res.send(todos)
})

app.get('/todo/:id', (req, res) => {
    const todo = todos[req.params.id]
    res.send(todo)
})

app.post('/todo/post', async (req, res) => {
  const result = validateSchema(schema, req.body);
    if(result.length) {
      res.send(result);
    } else {
      const id = Math.floor(100000 + Math.random() * 900000);
      if(!todos[id]) {
        todos[id] = req.body;
      }
      res.sendStatus(201);
    }
});

app.put('/todo/update/:id', async (req, res) => {
    const result = validateSchema(schema, req.body);
    if(result.length) {
      res.send(result);
    } else {
      todos[req.params.id] = req.body;
      res.send(req.body);
    }
});

app.put('/todo/delete/:id', async (req, res) => {
    if(todos[req.params.id]){
      delete todos[req.params.id]
      res.sendStatus(204);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const a = {
  name: "rock"
}

const schema = {
  name: value => /^[a-zA-Z ]{2,30}$/.test(value),
  message: value => /^[\w\-\s]{1,125}$/.test(value)
}

const validateSchema = (schema, obj) => {
  const a = Object.keys(obj).filter((key, i) => {
    console.log(i)
    if(schema[key]) {
      return !schema[key](obj[key])
    } else return true;
  }).map(value => new Error(`Schema not matching!! error in property ${value}`))
  return a;
}
console.log(validateSchema(schema, a))


