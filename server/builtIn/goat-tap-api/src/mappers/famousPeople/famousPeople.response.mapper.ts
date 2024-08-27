import { FamousPersonEntity } from "@/entities"
import { IFamousPeopleResponse } from "@core-ui/goat-tap-types"

export class FamousPeopleEntityToFamousPeopleResponse {
  public static map(source: FamousPersonEntity, options?: any): IFamousPeopleResponse {
    return {
      id: source.id,
      name: source.name,
      image: source.image,
      linkTwitter: source.linkTwitter,
      twitterHandler: source.twitterHandler,
      note: source.note,
      project: source.project,
      groupPoints: source.groupPoints || 0,
    }
  }

  public static maps(sources: FamousPersonEntity[], options?: any): IFamousPeopleResponse[] {
    return sources.map((item) => FamousPeopleEntityToFamousPeopleResponse.map(item))
  }
}