function iniciar(){
    getPokemons()
}

async function getPokemons(){
    var pokemons = await fetch("./php/pokemon_listar.php").then(resposta => {return resposta.json()});
    var corpo = document.getElementById('corpoTabela');

    corpo.innerHTML = '';
    for(i = 0; i < pokemons.length; i++){
        corpo.innerHTML += `
            <td>${pokemons[i].id}</td>
            <td><img src="${pokemons[i].imagem}" /></td>
            <td>${pokemons[i].numeroPokedex}</td>
            <td>${pokemons[i].nome}</td>
            <td>${pokemons[i].tipo1}</td>
            <td>${pokemons[i].tipo2}</td>
            <td>
                <button type="button" class="btn btn-danger" 
                onClick="excluirPokemon(${pokemons[i].id})">Excluir</button>
                <button type="button" class="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAdicionarAluno"
                    onClick="procuraPokemon(${pokemons[i].id})">Alterar</button>
            </td>
        `;
    }
}

async function updatePokemon(id){
    var numero = document.getElementById('nPokedex')
    var nome = document.getElementById('nome')
    var tipo1 = document.getElementById('tipo1')
    var tipo2 = document.getElementById('tipo2')

    await fetch(`./php/pokemon_alterar.php?id=${id}&numeroPokedex=${numero.value}&nome=${nome.value}&tipo1=${tipo1.value}&tipo2=${tipo2.value}`);
    iniciar()
}

async function procuraPokemon(id){
    var pokemon = await fetch(`./php/pokemon_selecionar.php?id=${id}`).then(resposta => {return resposta.json()});
    var corpoModal = document.getElementById('modalForm');

    for(i = 0; i < pokemon.length; i++){
        corpoModal.innerHTML = `
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalTitleAluno">Atualizar pokemon</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="id">Id</label>
                        <input type="text" value="${pokemon[i].id}" class="form-control" id="idPokemon" disabled>
                    </div>
                    <div class="form-group">
                        <label for="imagemPokemon">Imagem</label><br>
                        <img style="width: 50%; margin-left: 25%;" src="${pokemon[i].imagem}" />
                    </div>
                    <div class="form-group">
                        <label for="nome">Nome</label>
                        <input type="text" value="${pokemon[i].nome}" class="form-control" id="nome">
                    </div>
                    <div class="form-group">
                        <label for="nPokedex">Número da Pokedex</label>
                        <input type="text" value="${pokemon[i].numeroPokedex}" class="form-control" id="nPokedex">
                    </div>
                    <div class="form-group">
                        <label for="tipo1">Tipo 1</label>
                        <input type="text" value="${pokemon[i].tipo1}" class="form-control" id="tipo1">
                    </div>
                    <div class="form-group">
                        <label for="tipo2">Tipo 2</label>
                        <input type="text" value="${pokemon[i].tipo2}" class="form-control" id="tipo2">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick="updatePokemon(${pokemon[i].id})">Salvar</button>
            </div>
        `;
    }
}

async function excluirPokemon(id){
    if(confirm("Deseja realmente excluir esse Pokemon?")){
        await fetch(`./php/pokemon_excluir.php?id=${id}`);
        alert("Pokemon deletado com sucesso!")
    }
    iniciar()
}

async function limparPokemons(){
    if(confirm("Deseja realmente limpar todos os dados?")){
        await fetch(`./php/pokemon_limpar.php`);
        alert("Banco de Dados Limpo com Sucesso!")
    }
    iniciar()
}

async function importarPokemon(){
    var pokemon = document.getElementById('pokemonProcurado').value
    try{
        var res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`).then(resposta => {return resposta.json()});
    } catch {
        alert("Algo deu errado, verifique o Nome/Número inserido")
    }

    if(confirm(`Deseja Importar o Pokemon ${res.name.toUpperCase()} ao Banco de Dados?`)){
        var numero = res.id
        var nome = res.name
        var tipo1 = res.types[0].type.name
        if(res.types.length > 1){
            var tipo2 = res.types[1].type.name
        }else{
            var tipo2 = '-'
        }
        var imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.id}.png`

        var importacao = await fetch(`./php/pokemon_inserir.php?numeroPokedex=${numero}&nome=${nome}&tipo1=${tipo1}&tipo2=${tipo2}&imagem=${imagem}`);
        
        if (importacao.status == 200){
            alert('Pokemon(s) inseridos com sucesso!');
        } else{
            alert('Algo deu errado!');
        }
    }
    iniciar()
}
