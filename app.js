import express from 'express';


const movieApp = (movies) => {
    // instanciamos express
    const app = express();
// use of json middleware
app.use(express.json());

// rouitng
// GET
// landing page
app.get('/', (req, res) =>{
    res.status(200).send('<h1> Welcome to the Cinema</h1>')
});
// all movies
app.get('/movies', (req, res)=>{
    res.status(200).json(movies);
    res.status(404).send('No movies in the DDBB!');
});
// one movie
app.get('/movies/:id', ((req, res) => {
    // define id
    const id = req.params.id;
// search for it
  // const movie =  movies.find((element) =>(element.id == id));// returns object
  const movie =  movies.filter((element) =>(element.id == id));// returns array with an object
        
    res.status(200).json(movie);
    res.status(404).send('This movie is not in the DDBB!');

}));
// POST
app.post('/movies',(req, res)=>{
    const {id, title, poster, synopsis, genres = [], year, director, actors = []} = req.body
    const movie = {
        id,
        title,
        poster,
        synopsis,
        genres,
        year,
        director,
        actors
    }
    const findOne = movies.find((el) => el.id == movie.id);
    console.log(findOne);  
   (findOne) ? res.status(400).send('Unable to manage your request.')
               : movies.push(movie);
    
    // if real res.json(movie).status(201);
    res.json(movie).status(201);
    
});

// PUT
app.put('/movies/:id',(req, res) => {
    const id = req.params.id;
    let title = req.body;
    title = "The last Samurai"
    const movie =  movies.find((element) =>(element.id == id));
    movie.title = title;
    res.json({result: "Movie changed" }).status(200);
    console.log(movie);
})


// DELETE
app.delete('/movies/:id',(req, res) =>{
    const id = req.params.id;
  // movies.filter((el) => el.id == id).splice(0,1); it deletes the new array, not THE array
    const indexToDelete = movies.findIndex((el) => el.id == id);
    (indexToDelete != -1) ?  movies.splice(indexToDelete, 1) :  res.status(404).send('Movie not in the DDBB!');
    res.status(200).json(movies);
   
})
   
return app;
}


export default movieApp;
