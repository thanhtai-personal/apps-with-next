import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";
import { IFamousPeopleResponse, IFamousPeopleUpdate } from "@core-ui/goat-tap-types";

export interface FamousPeopleRoutes extends BaseRoutes {
  "/famous-people": {
    get: {
      request: {
        query: any;
      };
      responses: {
        "200": IResponse<Pagination<IFamousPeopleResponse>>;
      };
    };
  },
  "/famous-people/{id}": {
    get: {
      request: {
        params: {
          id: string | number;
        };
      };
      responses: {
        "200": IResponse<IFamousPeopleResponse>;
      };
    };
    put: {
      request: {
        params: {
          id: string | number;
        };
        body: IFamousPeopleUpdate;
      };
      responses: {
        "200": IResponse<IFamousPeopleResponse>;
      };
    };
    delete: {
      request: {
        params: {
          id: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          id: string | number;
        };
        body: Partial<IFamousPeopleUpdate>;
      };
      responses: {
        "200": IResponse<IFamousPeopleResponse>;
      };
    };
  };
}
