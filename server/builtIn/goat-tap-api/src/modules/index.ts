import { DbModule } from "@/database";
import { UsersModule } from "./user/users.module";
import { FamousPeopleModule } from "./famousPeople/famousPeople.module";
import { AuthModule } from "./auth/auth.module";
import { TelegramModule } from "./telegram/telegram.module";
import { SummaryModule } from "./summary/summary.module";
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BoostModule } from "./boost/boost.module";
import { AppScheduleModule } from "./schedule/schedule.module";
import { TonModules } from "./ton/ton.module";

export const allModule = [
  DbModule,
  EventEmitterModule.forRoot({
    // set this to `true` to use wildcards
    wildcard: false,
    // the delimiter used to segment namespaces
    delimiter: '.',
    // set this to `true` if you want to emit the newListener event
    newListener: false,
    // set this to `true` if you want to emit the removeListener event
    removeListener: false,
    // the maximum amount of listeners that can be assigned to an event
    maxListeners: 10,
    // show event name in memory leak message when more than maximum amount of listeners is assigned
    verboseMemoryLeak: false,
    // disable throwing uncaughtException if an error event is emitted and it has no listeners
    ignoreErrors: false,
  }),
  AuthModule,
  UsersModule,
  FamousPeopleModule,
  TelegramModule,
  SummaryModule,
  AppScheduleModule,
  BoostModule,
  TonModules
]