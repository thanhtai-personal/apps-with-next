import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types";
import {
  IJobCreation, IJobFilter
  , IJobResponse, IJobUpdating,
} from "@core-ui/recruiter-types";

export interface JobRoutes extends BaseRoutes {
  "/jobs": {
    get: {
      request: {
        query: IJobFilter;
      };
      responses: {
        "200": IAPIResponse<IPagingResponse<IJobResponse>>;
      };
    };
    post: {
      request: {
        query: IJobCreation;
      };
      responses: {
        "200": IAPIResponse<IJobResponse>;
      };
    };
  };

  "/jobs/all": {
    get: {
      request: {
        query: IJobFilter;
      };
      responses: {
        "200": INonPagingResponse<IJobResponse>;
      };
    };
  };

  "/jobs/{jobId}": {
    get: {
      request: {
        params: {
          jobId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<IJobResponse>;
      };
    };
    put: {
      request: {
        params: {
          jobId: string | number;
        };
        body: IJobUpdating;
      };
      responses: {
        "200": IAPIResponse<IJobResponse>;
      };
    };
    delete: {
      request: {
        params: {
          jobId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          jobId: string | number;
        };
        body: Partial<IJobUpdating>;
      };
      responses: {
        "200": IAPIResponse<IJobResponse>;
      };
    };
  };
}
