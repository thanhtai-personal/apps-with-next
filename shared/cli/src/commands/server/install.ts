import {Args, Command} from '@oclif/core'

export default class ServerInstall extends Command {
  static args = {
    module: Args.string({description: 'Module name', required: true}),
  }

  static description = 'TitanCore:Server creates modules'
  static examples = ['ttt server:install user-management', 'ttt server install user-management']

  public async run(): Promise<void> {
    const {args} = await this.parse(ServerInstall)

    if (!args.module) {
      console.error(`Missing module.`)
      return
    }

    console.log(`Install server's module: ${args.module}`)
  }
}
