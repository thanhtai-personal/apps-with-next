import React from 'react';
import { IRouter, Route } from '@core-ui/react-core';
import { Import } from '@core-utils/utils-helpers/import';

const Tap = Import({
  touch: React.lazy(() => import('@/containers/tab')),
  desktop: React.lazy(() => import('@/containers/tab'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Squad = Import({
  touch: React.lazy(() => import('@/containers/squad')),
  desktop: React.lazy(() => import('@/containers/squad'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Boost = Import({
  touch: React.lazy(() => import('@/containers/boost')),
  desktop: React.lazy(() => import('@/containers/boost'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const LuckyBonus = Import({
  touch: React.lazy(() => import('@/containers/luckyBonus')),
  desktop: React.lazy(() => import('@/containers/luckyBonus'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const OneVsOne = Import({
  touch: React.lazy(() => import('@/containers/oneVsOne')),
  desktop: React.lazy(() => import('@/containers/oneVsOne'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const League = Import({
  touch: React.lazy(() => import('@/containers/league')),
  desktop: React.lazy(() => import('@/containers/league'))
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

const Quest = Import({
  touch: React.lazy(() => import('@/containers/quest')),
  desktop: React.lazy(() => import('@/containers/quest'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const makeSuspense = (Component: React.FC) => {
  return <React.Suspense fallback={<div>loading</div>}>
    <Component />
  </React.Suspense>
}

export const goatTapRoutes: IRouter[] = [
  {
    element: makeSuspense(Squad),
    path: '/'
  },
  {
    element: makeSuspense(Tap),
    path: '/tap'
  },

  {
    element: makeSuspense(Boost),
    path: '/boost'
  },
  {
    element: makeSuspense(LuckyBonus),
    path: '/lucky-bonus'
  },
  {
    element: makeSuspense(OneVsOne),
    path: '/one-vs-one'
  },
  {
    element: makeSuspense(League),
    path: '/league'
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
    element: makeSuspense(Leaderboard),
    path: '/leaderboard'
  },
  {
    element: makeSuspense(Quest),
    path: '/quest'
  }
];
