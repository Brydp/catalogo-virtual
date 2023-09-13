import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';

function Produto() {
  const [ nome, setNome ] = useState( "" );
  const [ descricao, setDescricao ] = useState( "" );
  const [ tamanho, setTamanho ] = useState( "" );
  const [ imagem, setImagem ] = useState( "" );
  const [ produto, setProduto ] = useState( "" );
  const [ erro, setErro] = useState( "" );
  
  function Produto( evento ) {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "produto", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                nome: nome,
                descricao: descricao,
                tamanho: tamanho,
                imagem: imagem
            }
        )
    } )
    .then( (resposta) => resposta.json() )
    .then( ( json ) => {

        if( json._id ) {
            setProduto( true );
            setErro( false );
        } else {
            setErro( true );
            setProduto( false );
        }

    } )
    .catch( ( erro ) => { setErro( true ) } )

  }
  return (
    <Container component="section" maxWidth="xs">
       <Box sx={{ 
            mt: 20,
            backgroundColor: "#A3D5FF",
            padding:"50px",
            borderRadius:"10px",
            display: "flex",
            flexDirection:"column",
            alignItems:"center"
            }}>
                  <Typography component="h1" variant='h4'>Cadastrar a roupa cristã que vc deseja!!!</Typography>
                  { erro && ( <Alert severity="warning" sx={{ mt: 2, mb: 2}}>Blusa esgotada. Tente novamente mais tarde!</Alert>) }
                  { Produto && ( <Alert severity="success" sx={{ mt: 2, mb: 2}}>obrigado por se cadastrar</Alert>) }

                  <Box component="form" onSubmit={Produto}>
                  <TextField 
                    type="text" 
                    label="Nome" 
                    variant="filled" 
                    margin="normal" 
                    value={nome}
                    onChange={ (e) => setNome( e.target.value) }
                    fullWidth
                    required
                />
                 <TextField 
                    type="text" 
                    label="Descricao" 
                    variant="filled" 
                    margin="normal" 
                    value={descricao}
                    onChange={ (e) => setDescricao( e.target.value) }
                    fullWidth
                    required
                />
                 <TextField 
                    type="text" 
                    label="Tamanho" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={tamanho}
                    onChange={ (e) => setTamanho( e.target.value) }
                    required
                 />
                  <TextField 
                    type="img" 
                    label="Imagem" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={imagem}
                    onChange={ (e) => setImagem( e.target.value) }
                    required
                 />
                  <Button type="submit"  variant="contained" fullWidth sx={ {mt: 2, mb: 2 }}>Cadastrar a Roupa</Button>
                </Box>
        </Box>
    </Container>
  )
}

export default Produto