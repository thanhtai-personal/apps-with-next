import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import {
  ICategoryCreation, ICategoryFilter
  , ICategoryResponse, ICategoryUpdating,
} from "@core-ui/recruiter-types";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types";

export interface RecruiterCategoryRoutes extends BaseRoutes {
  "/recruiter/categories": {
    get: {
      request: {
        query: ICategoryFilter;
      };
      responses: {
        "200": IAPIResponse<IPagingResponse<ICategoryResponse>>;
      };
    };
    post: {
      request: {
        query: ICategoryCreation;
      };
      responses: {
        "200": IAPIResponse<ICategoryResponse>;
      };
    };
  };
  "/recruiter/categories/all": {
    get: {
      request: {
        query: ICategoryFilter;
      };
      responses: {
        "200": INonPagingResponse<ICategoryResponse>;
      };
    };
  };
  "/recruiter/categories/{categoryId}": {
    get: {
      request: {
        params: {
          categoryId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<ICategoryResponse>;
      };
    };
    put: {
      request: {
        params: {
          categoryId: string | number;
        };
        body: ICategoryUpdating;
      };
      responses: {
        "200": IAPIResponse<ICategoryResponse>;
      };
    };
    delete: {
      request: {
        params: {
          categoryId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          categoryId: string | number;
        };
        body: Partial<ICategoryUpdating>;
      };
      responses: {
        "200": IAPIResponse<ICategoryResponse>;
      };
    };
  };
}
