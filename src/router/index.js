import { createRouter, createWebHistory } from "vue-router";
import AppMain from "@/components/AppMain";
import AppItems from "@/components/AppItems";
import MoviesIdPage from "@/components/MoviesIdPage";
import CollectionsOfMovies from "@/components/CollectionsOfMovies";

const routes = [
  {
    path: "/",
    component: AppMain,
  },
  {
    path: "/search",
    component: AppItems,
    props: { contentType: "search" },
  },
  {
    path: "/favorites",
    component: AppItems,
    props: { contentType: "favorites" },
  },
  {
    path: "/movies/:id",
    component: MoviesIdPage,
  },
  { path: "/collections", component: CollectionsOfMovies },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
