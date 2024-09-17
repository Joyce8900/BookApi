const buttons = document.getElementById('buttons')
const res = window.document.getElementById("res")
const bookCard = document.createElement('div')
const menu = document.getElementById('menu')
const menu1=()=>{
  buttons.style.visibility = 'visible'
  books.innerHTML = ''
  res.innerHTML  = ""
}
const listar = () => {
  menu.style.visibility = 'visible'
  buttons.style.visibility = 'hidden';
  fetch('https://books-api-v3.vercel.app/api/books/')
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
      const booksContainer = document.getElementById('books'); // Seleciona o elemento onde os livros serão exibidos
      booksContainer.innerHTML = ''; // Limpa o container antes de adicionar novos livros
      data.forEach(book => {
        const bookCard = document.createElement('div'); // Cria um novo card para cada livro
        bookCard.classList.add('book-card'); // Adiciona uma classe para estilização

        bookCard.innerHTML = `<div id='resposta'>
          
          <h1 id="titulo">${book.titulo}</h1>
          <h4>${book.genero}</h4>
          
        </div>`;
        booksContainer.appendChild(bookCard); 
      });
    })
    .catch(error => console.error('Erro:', error)); 
};

const buscar = () => {
  menu.style.visibility = 'visible';
  buttons.style.visibility = 'hidden';

  
  res.innerHTML = ''

  const input = document.createElement("input");
  input.id = "nome";
  input.placeholder = "Digite o nome do livro";

  const buttonBuscar = document.createElement("button");
  buttonBuscar.id = "buttonBuscar";
  buttonBuscar.textContent = "Buscar";

  res.appendChild(input);
  res.appendChild(buttonBuscar);

  buttonBuscar.addEventListener("click", () => {
    const nome = document.getElementById('nome').value; 
    const nomeFormatado = nome.replace(/ /g, "%20").toLowerCase()
    fetch(`https://books-api-v3.vercel.app/api/books/search/?nome=${nomeFormatado}`)
      .then(response => response.json()) 
      .then(data =>{
        data.forEach(book=>{
          const bookCard = document.createElement('div'); 
          bookCard.classList.add('book-card'); 

          bookCard.innerHTML = `<div id='respostaBuscar'>
            <h1>${book.titulo}</h1>
            <p>${book.descricao}</p>
          </div>`;
          res.appendChild(bookCard)
          console.log(data)
          console.log(book.titulo)
          console.log(nomeFormatado)
        })
        
      }) // Exibe o resultado no console
      .catch(error => console.log('error', error)); // Trata erros na requisição
  });
};


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
    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: {
        "Content-Type": "application/json"  
      },
      redirect: 'follow'
    };
    var raw = JSON.stringify({
      "titulo": nome,  
      "descricao": "descrição do livro",  
      "genero": "genero do livro",  
      "ano_pub": ano,  
      "autor": autor
    });
    
    fetch("https://books-api-v3.vercel.app/api/books/", requestOptions).then(response => response.json()).then(data =>{
      console.log(data)
    }).catch(err =>console.log(err,"Erro"))
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

