import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { IPagingResponse, INonPagingResponse } from "@core-ui/common-types"
import {
  IChapterCreation, IChapterFilter
  , IChapterResponse, IChapterUpdating,
} from "@core-ui/novels-types";

export interface ChapterRoutes extends BaseRoutes {
  "/chapters": {
    get: {
      request: {
        query: IChapterFilter;
      };
      responses: {
        "200": IPagingResponse<IChapterResponse>;
      };
    };
    post: {
      request: {
        query: IChapterCreation;
      };
      responses: {
        "200": IAPIResponse<IChapterResponse>;
      };
    };
  };

  "/chapters/all": {
    get: {
      request: {
        query: IChapterFilter;
      };
      responses: {
        "200": INonPagingResponse<IChapterResponse>;
      };
    };
  };

  "/chapters/{chapterId}": {
    get: {
      request: {
        params: {
          chapterId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<IChapterResponse>;
      };
    };
    put: {
      request: {
        params: {
          chapterId: string | number;
        };
        body: IChapterUpdating;
      };
      responses: {
        "200": IAPIResponse<IChapterResponse>;
      };
    };
    delete: {
      request: {
        params: {
          chapterId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          chapterId: string | number;
        };
        body: Partial<IChapterUpdating>;
      };
      responses: {
        "200": IAPIResponse<IChapterResponse>;
      };
    };
  };
}
