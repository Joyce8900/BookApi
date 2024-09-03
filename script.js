const buttons = document.getElementById('buttons')
const res = window.document.getElementById("res")
const bookCard = document.createElement('div')
const menu = document.getElementById('menu')
const menu1=()=>{
  buttons.style.visibility = 'visible'
  books.innerHTML = ''
}
const listar = () => {
  menu.style.visibility = 'visible'
  buttons.style.visibility = 'hidden';
  fetch('https://books-api-v2.vercel.app/api/books/')
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
      const booksContainer = document.getElementById('books'); // Seleciona o elemento onde os livros serão exibidos
      booksContainer.innerHTML = ''; // Limpa o container antes de adicionar novos livros
      data.forEach(book => {
        const bookCard = document.createElement('div'); // Cria um novo card para cada livro
        bookCard.classList.add('book-card'); // Adiciona uma classe para estilização

        bookCard.innerHTML = `<div id='resposta'>
          <img src='${book.image}' id='image' alt=${book.title}>
          <div>
              <h3>${book.titulo}</h3>
              <p>${book.descricao}</p>
              <h4><small>Autor: ${book.autor}</small></h4>
              <h4><small>Gênero: ${book.genero}</small></h4>
          </div>
        </div>`;
        booksContainer.appendChild(bookCard); // Adiciona o card ao container de livros
      });
    })
    .catch(error => console.error('Erro:', error)); // Trata erros na requisição
};

const buscar = ()=>{
  
  res.innerHTML = ""
  let pBuscar = document.createElement("p")
  pBuscar.textContent = "Qual o nome do livro:"
  res.appendChild(pBuscar)
  //Entrada de texto
  let input = window.document.createElement("input")
  input.id = "input"
  input.type="text"
  input.className = "input"

  res.appendChild(input);

  //buttom
  let button = window.document.createElement("button")
  button.textContent = "Buscar"
  button.className = "button"
  button.id = "buttonBuscar"
  let achado = false

  
  
  button.addEventListener("click", function(){
    
    let textBuscar = document.getElementById("input").value.toLowerCase().trim()
    res.innerHTML = ""
    if (textBuscar.length === 0) {
      res.innerHTML = "Por favor, digite o nome do livro.";
      return; 
    }
    let achado = false
    for (let i = 0; i < obj.livros.length; i++) {
      if (obj.livros[i].nome.toLowerCase().includes(textBuscar)) {
        res.innerHTML += `<br>Titulo: ${obj.livros[i].nome} - Autor: ${obj.livros[i].autor} - Ano: ${obj.livros[i].ano}`
        achado = true
        break
      }

    } if (!achado) {
      res.innerHTML += 'Nenhum livro encontrado'
    }
  }

  )
  res.appendChild(button) 
}

const adicionar = ()=>{
  res.innerHTML = ''
  //elemento pNome
  let pNome = window.document.createElement('p')
  pNome.textContent = 'Digite o nome do livro'
  res.appendChild(pNome)
  //input nome
  let inputNome = window.document.createElement("input")
  inputNome.id = "inputNome"
  inputNome.type = "text"
  inputNome.className = "input"
  
  res.appendChild(inputNome)

  // elemento pAutor
  let pAutor = window.document.createElement('p')
  pAutor.textContent = 'Digite o autor do livro'
  res.appendChild(pAutor)
  
  let inputAutor = window.document.createElement("input")
  inputAutor.id = "inputAutor"
  inputAutor.type = "text"
  
  inputAutor.className = "input"
  res.appendChild(inputAutor)

  // elemento pAutor
  let pAno = window.document.createElement('p')
  pAno.textContent = 'Digite o ano de lançamento'
  res.appendChild(pAno)

  let inputAno = window.document.createElement("input")
  inputAno.id = "inputAno"
  inputAno.type = "number"
  inputAno.className = "input"
  
  res.appendChild(inputAno)

  let button = window.document.createElement('button')
  button.textContent = 'Adicionar'
  button.className = "button"
  res.appendChild(button)

  button.addEventListener('click', function (){
    let nome = window.document.getElementById('inputNome').value
    let autor = window.document.getElementById('inputAutor').value
    let ano = window.document.getElementById('inputAno').value
    if (nome && autor && ano) {
      let livros = JSON.parse(localStorage.getItem('livros')) || []
      if (!livroExiste(nome)) {
        obj.livros.push(
      { "nome": `${nome}`, "autor": `${autor}`, "ano": `${ano}` })
        
        localStorage.setItem('livros', JSON.stringify(obj.livros));

        listar()
        
      } else {
        res.innerHTML += '<br>O livro já existe na lista.'
      }
    }else{
      res.innerHTML += '<br>Preencha todos os campos'
    }    
  })
}

const excluir =()=>{
  res.innerHTML = ''
  //p
  let p = window.document.createElement('p')
  p.textContent = 'Nome do livro que desejar excluir:'
  res.appendChild(p)

  //Input
  let input = window.document.createElement('input')
  input.id = 'inputId'
  input.className = "input"
  res.appendChild(input)

  //Button
  let button = window.document.createElement('button')
  button.id = 'buttonId'
  button.className = "button"
  res.appendChild(button)
  button.textContent = 'Excluir'

  button.addEventListener('click', function(){
    let inputExcluir = String(input.value)
    if(inputExcluir){
        const index = obj.livros.findIndex(livro => livro.nome.toLowerCase() === inputExcluir.toLowerCase());
        if (index > -1) {
          obj.livros.splice(index, 1);
          console.log(obj.livros)
          localStorage.setItem('livros', JSON.stringify(obj.livros));
          listar()
          
        }else{
          res.innerHTML = '<br>Este livro não existe'
        }
      }
      else{
        res.innerHTML = '<br>Insira o nome do livro'
        
      }   
  })
}
const renomear = ()=>{
  res.innerHTML = ""
  listar()
  //input id
  res.innerHTML += `<p>Qual o id do livro que você deseja renomear:</p>`
  let inputTxtId = window.document.createElement ("input")
  inputTxtId.id = "id"
  inputTxtId.className = "input"
  res.appendChild(inputTxtId)

  
  //button
  let buttomId = document.createElement("button")
  buttomId.textContent = "Avança"
  buttomId.className = "button"
  res.appendChild(buttomId)

  buttomId.addEventListener("click" ,function (){
    let inputId = document.getElementById("id").value
    let index = inputId -1
    if (inputId >= 1  && inputId < obj.livros.length+1){
      res.innerHTML = ""
      
      res.innerHTML += `${obj.livros[index].nome} - ${obj.livros[index].autor} - ${obj.livros[index].ano}`
      res.innerHTML += `<p>Nome</p>`
      let inputTxtNome = window.document.createElement("input")
      inputTxtNome.id = "nome"
      inputTxtNome.className = "input"
      
      res.appendChild(inputTxtNome)

      res.innerHTML += `<p>Autor</p>`
      let inputTxtAutor = window.document.createElement("input")
      inputTxtAutor.id = "autor"
      inputTxtAutor.className = "input"
      
      res.appendChild(inputTxtAutor)

      res.innerHTML += `<p>Ano do lançamento</p>`
      let inputTxtAno = window.document.createElement("input")
      inputTxtAno.id = "ano"
      inputTxtAno.className = "input" 
      
      res.appendChild(inputTxtAno)

      let buttom = window.document.createElement("button")
      buttom.textContent = "Renomear"
      buttom.className = "button"
      res.appendChild(buttom)

      buttom.addEventListener("click", ()=>{
        let nome = document.getElementById("nome").value
        let autor = document.getElementById("autor").value
        let ano = document.getElementById("ano").value
        obj.livros[index] = { nome:nome , autor: autor, ano:ano };
        console.log(obj.livros[index])
        localStorage.setItem('livros', JSON.stringify(obj.livros));
        listar()
        
      })
        
      }else{
        res.innerHTML = "id invalido"
      }
  }) 
}

