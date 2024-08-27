// events/user.events.ts
export class UserPointsUpdatedEvent {
  constructor(
    public readonly famousPersonId: number,
  ) { }
}
