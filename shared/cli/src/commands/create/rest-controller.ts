import {Args, Command} from '@oclif/core'

export default class CreateRestController extends Command {
  static args = {
    component: Args.string({description: 'Component name', required: true}),
  }

  static description = 'TitanCore creates components'
  static examples = ['ttt create:rest-controller User', 'ttt create rest-controller User']

  public async run(): Promise<void> {
    const {args} = await this.parse(CreateRestController)

    if (!args.component) {
      console.error(`Missing component.`)
      return
    }

    console.log(`Install component: ${args.component}`)
  }
}
