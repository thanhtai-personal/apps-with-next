import { IRouter } from '@core-ui/react-core';
import PickGoat from '@/containers/pickGoat';
import ChangeGoat from '@/containers/changeGoat';
import Boost from '@/containers/boost';
import Tap from '@/containers/tap';
import Referral from '@/containers/referral';
import SquadDetail from '@/containers/squadDetail';
import Leaderboard from '@/containers/leaderboard';
import Search from '@/containers/search';
import React from "react";
import { LoadingPage } from "@/components/LoadingPage";
import { Import } from '@core-utils/utils-helpers/import';
import { SceneNames } from "@core-ui/react-goat-tap";

const makeSuspense = (Component: React.FC) => {
  return <React.Suspense fallback={<LoadingPage isStrongPlatform={false} />}>
    <Component />
  </React.Suspense>
}

const NotFoundPage = Import({
  touch: React.lazy(() => import('@/containers/404')),
  desktop: React.lazy(() => import('@/containers/404'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const ScenesSwitcher = Import({
  touch: React.lazy(() => import('@/containers/scenesSwitcher')),
  desktop: React.lazy(() => import('@/containers/scenesSwitcher'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

export const singleRoutes: IRouter[] = [
  {
    element: makeSuspense(ScenesSwitcher),
    path: '/'
  },
  {
    path: "*",
    element: makeSuspense(NotFoundPage),
  },
];

export const Scenes = {
  [SceneNames.TAP]: Tap,
  [SceneNames.LEADERBOARD]: Leaderboard,
  [SceneNames.REFERRAL]: Referral,
  [SceneNames.PICK_GOAT]: PickGoat,
  [SceneNames.CHANGE_GOAT]: ChangeGoat,
  [SceneNames.BOOST]: Boost,
  [SceneNames.SQUAD_DETAIL]: SquadDetail,
  [SceneNames.SEARCH]: Search,
}
