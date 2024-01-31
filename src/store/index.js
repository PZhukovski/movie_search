import { createStore } from 'vuex';
import { filmsModule } from '@/store/filmsModule';
import { seriesModule } from '@/store/seriesModule';
import { cartoonsModule } from './cartoonsModule';
import { animeModule } from './animeModule';
import { animatedSeriesModule } from './animatedSeriesModule';
import { filterModule } from './filterModule';
import { favoritesModule } from './favoritesModule'
import { idMovieModule } from './idMovieModule';
import { oscarFilmsModule } from '@/store/oscarFilmsModule';
import { top100FilmsModule } from "@/store/top100FilmsModule";
import { romanticFilmsModule } from "@/store/romanticFilmsModule";
import { expensiveFilmsModule, } from  "@/store/expensiveFilmsModule";
import { cannesFilmsModule } from '@/store/cannesFilmsModule';
import { programmersFilmsModule } from './programmersFilmsModule';
export default createStore({
  modules: {
   films: filmsModule,
   series: seriesModule,
   cartoons: cartoonsModule,
   anime: animeModule,
   animatedSeries: animatedSeriesModule,
   filterMovie: filterModule,
   favorites: favoritesModule,
   idMovie: idMovieModule,
   oscarFilms: oscarFilmsModule,
   top100Films: top100FilmsModule,
   romanticFilms: romanticFilmsModule,
   expensiveFilms: expensiveFilmsModule,
   cannesFilms: cannesFilmsModule,
   programmersFilms: programmersFilmsModule
  }
})
