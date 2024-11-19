import {Args, Command} from '@oclif/core'

export default class ClientInstall extends Command {
  static args = {
    module: Args.string({description: 'Module name', required: true}),
  }

  static description = 'TitanCore:Client creates modules'
  static examples = ['ttt client:install user-management', 'ttt client install user-management']

  public async run(): Promise<void> {
    const {args} = await this.parse(ClientInstall)

    if (!args.module) {
      console.error(`Missing module.`)
      return
    }

    console.log(`Install client's module: ${args.module}`)
  }
}
