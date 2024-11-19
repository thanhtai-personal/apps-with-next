import { useEffect, useMemo } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { useLocalStorageData } from "@core-utils/react-hooks"
import { useRecruiterStore } from "../store";
import { IPagingResponse } from "@core-ui/common-types";
import { IJobResponse } from "@core-ui/recruiter-types";

export const useJobsData = () => {
  const { jobStore, notiStore } = useRecruiterStore();
  const [savedJobs, setSavedJobs] = useLocalStorageData("saved-jobs");
  const [selectedJobs, setSelectedJobs] = useLocalStorageData("selected-jobs");

  const refetch = async () => {
    try {
      jobStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getJobControl?.().getMany?.((jobStore.filterData || {}) as IPagingResponse<IJobResponse>);
      jobStore.jobs = response;
    } catch (error) { } finally {
      jobStore.loading = false;
    }
  }

  const searchJobs = async (filter = {}) => {
    try {
      jobStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getJobControl?.().getMany?.({ ...(jobStore.filterData || {}), ...filter } as IPagingResponse<IJobResponse>);
      jobStore.jobs = response;
    } catch (error) { } finally {
      jobStore.loading = false;
    }
  }

  const getJobDetail = async (id: string | number) => {
    try {
      jobStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getJobControl?.().getOne?.(id);
      jobStore.job = response;
    } catch (error) { } finally {
      jobStore.loading = false;
    }
  }

  const deleteJob = async (id: string | number) => {
    try {
      jobStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getJobControl?.().delete?.(id);
      notiStore.messageQueue = [...(notiStore.messageQueue || []), {
        children: "Delete Success",
        variant: "success"
      }]
      await refetch();
    } catch (error) {
      notiStore.messageQueue = [...(notiStore.messageQueue || []), {
        children: "Delete failed",
        variant: "error"
      }]
    } finally {
      jobStore.loading = false;
    }
  }

  useEffect(() => {
    jobStore.savedJobs = savedJobs || [];
  }, [savedJobs])

  useEffect(() => {
    jobStore.selectedJobs = selectedJobs || [];
  }, [selectedJobs])

  const viewJob = (job: any) => {
    jobStore.job = job;
  }

  const handleSavedJob = (job: any) => {
    setSavedJobs((prev) => {
      if (prev) {
        const existJob = prev.find(j => j.id === job.id)
        if (existJob) {
          return prev.filter(j => j.id !== job.id);
        } else {
          return [job, ...prev]
        }
      } else {
        return [job]
      }
    })
  }

  const selectJob = (job: any) => {
    setSelectedJobs((prev) => {
      if (prev) {
        const existJob = prev.find(j => j.id === job.id)
        if (existJob) {
          return prev.filter(j => j.id !== job.id);
        } else {
          return [job, ...prev]
        }
      } else {
        return [job]
      }
    })
  }

  const clearSelectedJobs = () => {
    setSelectedJobs([])
  }

  return {
    refetch,
    deleteJob,
    searchJobs,
    getJobDetail,
    viewJob,
    handleSavedJob,
    selectJob,
    clearSelectedJobs
  }
}

export const runJobs = () => {
  const { refetch } = useJobsData();
  const { jobStore } = useRecruiterStore();

  useEffect(() => {
    refetch();
  }, []);

  const todayJobs = useMemo(() => {
    return []
  }, [jobStore.jobs?.data])

  const currentWeekJobs = useMemo(() => {
    return []
  }, [jobStore.jobs?.data])

  return {
    todayJobs,
    currentWeekJobs
  }
}