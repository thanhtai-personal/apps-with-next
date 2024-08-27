import { useEffect } from "react"
import { useGoatTapStore } from "../store"
import GoatTapSDK, { Pagination } from "@core-sdk/goat-tap";
import { IUserResponse } from "@core-ui/goat-tap-types";

export const useFriends = () => {
  const { accountStore } = useGoatTapStore();

  const refetch = async () => {
    try {
      const friendsDataResponse: Pagination<IUserResponse> = await GoatTapSDK.getInstance().getUserControl().getMany({
        offset: accountStore.friendsPaging?.offset || 0,
        limit: accountStore.friendsPaging?.limit || 10,
        referralBy: accountStore.account?.id
      }) as Pagination<IUserResponse>;
      accountStore.friends = friendsDataResponse.data || [];
      accountStore.totalFriends = friendsDataResponse.total || 0;
    } catch (error) {}
  }

  useEffect(() => {
    if (accountStore?.account?.id) {
      refetch();
    }
  }, [accountStore?.account?.id]);

  const loadMore = async () => {
    accountStore.friendsPaging!.offset = (accountStore.friendsPaging?.offset || 0) + (accountStore.friendsPaging?.limit || 10);
    const friendsDataResponse: Pagination<IUserResponse> = await GoatTapSDK.getInstance().getUserControl().getMany({
      offset: accountStore.friendsPaging?.offset || 0,
      limit: accountStore.friendsPaging?.limit || 10,
      referralBy: accountStore.account?.id
    }) as Pagination<IUserResponse>;
    accountStore.totalFriends = friendsDataResponse.total || 0;
    accountStore.friends = [
      ...(accountStore.friends || []),
      ...(friendsDataResponse.data || [])
    ];
  }

  return { loadMore }
}