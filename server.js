import movieApp from './app.js';
import movies from './movies.js';

const app = movieApp(movies);

const PORT = 3000;
app.listen(PORT, _=> console.log(`All sounds good in port ${PORT}`));