import { Suspense, lazy } from "react";

const RolesContainer = lazy(() => import("../containers/roles"));
const UsersContainer = lazy(() => import("../containers/users"));
const PermissionContainer = lazy(() => import("../containers/permission"));

export const router = [
  {
    path: "/admin/users",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <UsersContainer />
      </Suspense>
    ),
  },
  {
    path: "/admin/roles",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <RolesContainer />
      </Suspense>
    ),
  },
  {
    path: "/admin/permission",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <PermissionContainer />
      </Suspense>
    ),
  },
];
