import { useEffect } from "react";
import { useRecruiterStore } from "../store"
import { AppcenterSDK } from "@core-sdk/app-center";


export const useCrawler = () => {
  const { jobStore, notiStore } = useRecruiterStore();

  const exportAnydayJob = async (jobId: string, categoryId: number, htmlString: string) => {
    try {
      const jobs: any = await AppcenterSDK.getInstance().addAnydatJobData?.(jobId, categoryId, htmlString);
      jobStore.jobs = jobs;
      notiStore.messageQueue?.push({
        children: "Add job success!",
        variant: "success"
      })
    } catch (error) { }
  }

  return {
    exportAnydayJob,
  }
}

export const runCrawler = () => {

  useEffect(() => {
  }, [])
}