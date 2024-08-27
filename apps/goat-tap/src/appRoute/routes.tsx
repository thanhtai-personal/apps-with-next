import React from 'react';
import { IRouter } from '@core-ui/react-core';
import { Import } from '@core-utils/utils-helpers/import';
import { LoadingPage } from "@/components/LoadingPage";

// const Tap = Import({
//   touch: React.lazy(() => import('@/containers/tab')),
//   desktop: React.lazy(() => import('@/containers/tab'))
// }) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const PickGoat = Import({
  touch: React.lazy(() => import('@/containers/pickGoat')),
  desktop: React.lazy(() => import('@/containers/pickGoat'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const ChangeGoat = Import({
  touch: React.lazy(() => import('@/containers/changeGoat')),
  desktop: React.lazy(() => import('@/containers/changeGoat'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Boost = Import({
  touch: React.lazy(() => import('@/containers/boost')),
  desktop: React.lazy(() => import('@/containers/boost'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

// const LuckyBonus = Import({
//   touch: React.lazy(() => import('@/containers/luckyBonus')),
//   desktop: React.lazy(() => import('@/containers/luckyBonus'))
// }) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

// const OneVsOne = Import({
//   touch: React.lazy(() => import('@/containers/oneVsOne')),
//   desktop: React.lazy(() => import('@/containers/oneVsOne'))
// }) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Tap = Import({
  touch: React.lazy(() => import('@/containers/tap')),
  desktop: React.lazy(() => import('@/containers/tap'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Referral = Import({
  touch: React.lazy(() => import('@/containers/referral')),
  desktop: React.lazy(() => import('@/containers/referral'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const SquadDetail = Import({
  touch: React.lazy(() => import('@/containers/squadDetail')),
  desktop: React.lazy(() => import('@/containers/squadDetail'))
});

const Leaderboard = Import({
  touch: React.lazy(() => import('@/containers/leaderboard')),
  desktop: React.lazy(() => import('@/containers/leaderboard'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Search = Import({
  touch: React.lazy(() => import('@/containers/search')),
  desktop: React.lazy(() => import('@/containers/search'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

// const Quest = Import({
//   touch: React.lazy(() => import('@/containers/quest')),
//   desktop: React.lazy(() => import('@/containers/quest'))
// }) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const NotFoundPage = Import({
  touch: React.lazy(() => import('@/containers/404')),
  desktop: React.lazy(() => import('@/containers/404'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;


const makeSuspense = (Component: React.FC) => {
  return <React.Suspense fallback={<LoadingPage isStrongPlatform={false} />}>
    <Component />
  </React.Suspense>
}

export const router: IRouter[] = [
  {
    element: makeSuspense(PickGoat),
    path: '/'
  },
  {
    element: makeSuspense(ChangeGoat),
    path: '/update-goat'
  },
  {
    element: makeSuspense(Tap),
    path: '/tap'
  },
  {
    element: makeSuspense(Leaderboard),
    path: '/league'
  },
  {
    element: makeSuspense(Boost),
    path: '/boost'
  },
  {
    element: makeSuspense(Referral),
    path: '/referral'
  },
  {
    element: makeSuspense(SquadDetail),
    path: '/squad/:id'
  },
  {
    element: makeSuspense(Search),
    path: '/league/search'
  },
  // {
  //   element: makeSuspense(Quest),
  //   path: '/quest'
  // },
  // {
  //   element: makeSuspense(LuckyBonus),
  //   path: '/lucky-bonus'
  // },
  // {
  //   element: makeSuspense(OneVsOne),
  //   path: '/one-vs-one'
  // },
  {
    path: "*",
    element: makeSuspense(NotFoundPage),
  },
];
