# Calculadora de Fórmula de Chance

Este projeto é uma aplicação web desenvolvida com Jekyll que fornece uma calculadora para determinar a chance de sucesso com base em uma fórmula quadrática. A calculadora permite que os usuários insiram coeficientes e o tier do item para calcular a chance, além de oferecer a opção de calcular os coeficientes a partir de chances conhecidas.

## Estrutura do Projeto

O projeto possui a seguinte estrutura de diretórios:

```
calculadora-forja-jekyll
├── _config.yml          # Configuração principal do Jekyll
├── _layouts             # Layouts do site
│   ├── default.html     # Layout padrão
│   └── page.html        # Layout específico para páginas
├── _includes            # Inclusões de cabeçalho e rodapé
│   ├── footer.html      # Rodapé do site
│   └── header.html      # Cabeçalho do site
├── _data                # Dados do site
│   └── presets.yml      # Presets para a calculadora
├── assets               # Arquivos estáticos
│   ├── css
│   │   └── styles.css   # Estilos CSS do site
│   └── js
│       └── calculator.js # Código JavaScript da calculadora
├── pages                # Páginas em formato Markdown
│   ├── about.md         # Informações sobre o projeto
│   └── instructions.md   # Instruções de uso da calculadora
├── index.html           # Página inicial do site
├── calculadora.html     # Página da calculadora de fórmula de chance
├── Gemfile              # Gerenciamento de dependências do Ruby
├── Gemfile.lock         # Versões exatas das gemas instaladas
└── README.md            # Documentação do projeto
```

## Como Configurar

1. **Instalação do Ruby**: Certifique-se de que o Ruby está instalado em sua máquina. Você pode verificar isso executando `ruby -v` no terminal.

2. **Instalação do Jekyll**: Instale o Jekyll e Bundler executando o seguinte comando:

   ```
   gem install jekyll bundler
   ```

3. **Instalação das Dependências**: Navegue até o diretório do projeto e execute:

   ```
   bundle install
   ```

4. **Executar o Servidor**: Para iniciar o servidor Jekyll, execute:

   ```
   bundle exec jekyll serve
   ```

5. **Acessar o Site**: Abra seu navegador e acesse `http://localhost:4000` para visualizar a calculadora.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.