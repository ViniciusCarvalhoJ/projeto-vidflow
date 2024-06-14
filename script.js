const containerVideos = document.querySelector(".videos__container");

async function buscarEncontrarVideos() {
  try {
    const busca = await fetch("http://localhost:3000/videos");
    const videos = await busca.json();

    videos.forEach((video) => {
        if(video.categoria == "") {
            throw new Error('Video não tem categoria');
        }
      containerVideos.innerHTML += `
                    <li class = "videos__item">
                        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                        <div class= "descricao-video">
                            <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                            <h3 class="titulo-video">${video.titulo}</h3>
                            <p class="titulo-canal">${video.descricao}</p>
                            <p class = "categoria" hidden>${video.categoria}</p>
                        </div>

                    </li>
                    `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os video: ${error} `;
  }
}

buscarEncontrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item");
    const valorFiltro =  barraDePesquisa.value.toLowerCase();

    videos.forEach((videos) => {
        const titulo = videos.querySelector (".titulo-video").textContent.toLowerCase();
        
        videos.style.display == valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

const botaoCategoria = document.querySelectorAll(".superior__item");

//-> Adiciona um listener de evento de clique a cada botão de categoria
botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name"); //! Obtém o nome da categoria do botão
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria)); //! Adiciona o evento de clique
});

//-> Função para filtrar vídeos por categoria
function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item"); //! Seleciona todos os vídeos
    for(let video of videos) { //! Itera sobre cada vídeo
        let categoria = video.querySelector(".categoria").textContent.toLowerCase(); //! Obtém a categoria do vídeo
        let valorFiltro = filtro.toLowerCase(); //! Converte o filtro para minúsculas

        //-> Verifica se a categoria do vídeo não inclui o filtro e o filtro não é "tudo"
        if(!categoria.includes(valorFiltro) && valorFiltro != "tudo"){
            video.style.display = "none"; //! Oculta o vídeo
        } else{
            video.style.display = "block"; //! Exibe o vídeo
        }
    }
}

