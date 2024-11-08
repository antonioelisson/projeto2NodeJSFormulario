import express from "express";

const host = "0.0.0.0";
const porta = 3000;
const app = express();

app.use(express.urlencoded({extended: true}));

var listaAlunos = [];

function apresentaFormulario(requisicao, resposta){
resposta.send(` <html>
                    <head>
                        <meta charset="UTF-8"/>
                        <title>Cadastro de contato</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                        <style>
                            body{
                                width: 700px;
                                margin: auto;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>Contato</h2></br>
                        <hr>
                        <form method="POST" action="/formulario" class="row g-3" novalidate>

                            <div class="col-md-4">
                                <label for="nome" class="form-label">Nome completo</label>
                                <input type="text" class="form-control" id="nome" name="nome" required>
                            </div>

                            <div class="col-md-4">
                                <label for="telefone" class="form-label">Celular</label>
                                <input type="text" class="form-control" id="telefone" name="telefone" placeholder="(xx)xxxxx-xxxx" required>
                            </div>

                            <div class="col-md-4">
                                <label for="email" class="form-label">Email</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" class="form-control" id="email" name="email" aria-describedby="inputGroupPrepend" required>
                                    <div class="invalid-feedback">
                                        Please choose a username.
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="mensagem" class="form-label">Mensagem</label>
                                <textarea class="form-control" id="mensagem" name="mensagem" placeholder="Deixe sua mensagem" ></textarea>   
                            </div>

                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Enviar</button>
                            </div>
                        </form>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                </html> `);
}

function cadastrarAluno(req, resp){
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const mensagem = req.body.mensagem;

    const aluno = {nome, telefone, email, mensagem};
    
    listaAlunos.push(aluno);

    resp.write(` <html>
                    <head>
                        <meta charset="UTF-8"/>
                        <title>Cadastro de contato</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                    </head>
                    <body>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Celular</th>
                                    <th>Email</th>
                                    <th>Mensagem</th>
                                </tr>
                            </thead>
                            <tbody> `);

                            for(var i = 0; i < listaAlunos.length; i++){
                                resp.write(` <tr>
                                                <td>${listaAlunos[i].nome}</td>
                                                <td>${listaAlunos[i].telefone}</td>
                                                <td>${listaAlunos[i].email}</td>
                                                <td>${listaAlunos[i].mensagem}</td>
                                            </tr> `);
                            }
    resp.write(`            </tbody>  
            
                        </table>

                        <p><a class="btn btn-primary" href="/formulario">Cadastrar outro aluno</a></p>
                    
                        </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                </html> `);
                        
    resp.end();
}

app.get('/formulario', apresentaFormulario);

app.post('/formulario', cadastrarAluno);

app.listen(porta, host, () => {
    console.log("Servidor iniciado http://" + host + ":" + porta);
});